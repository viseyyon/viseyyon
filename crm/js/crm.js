// Viseyyon CRM - Lead Management System

const CRM = {
  supabaseUrl: null,
  supabaseKey: null,
  leads: [],
  filteredLeads: [],

  init() {
    // Check if logged in
    const savedConfig = localStorage.getItem('crm_config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      this.supabaseUrl = config.url;
      this.supabaseKey = config.key;
      this.hideLoginModal();
      this.loadLeads();
    }

    // Event listeners
    document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('refreshBtn').addEventListener('click', () => this.loadLeads());
    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
    document.getElementById('searchInput').addEventListener('input', (e) => this.handleSearch(e));
    document.getElementById('statusFilter').addEventListener('change', (e) => this.handleFilter(e));
    document.getElementById('sortBy').addEventListener('change', (e) => this.handleSort(e));
  },

  async handleLogin(e) {
    e.preventDefault();
    const code = document.getElementById('accessCode').value;

    // Try to parse as config JSON
    try {
      const config = JSON.parse(code);
      if (config.url && config.key) {
        this.supabaseUrl = config.url;
        this.supabaseKey = config.key;
      }
    } catch {
      // Assume it's the Supabase URL and key separated by a pipe
      if (code.includes('|')) {
        const [url, key] = code.split('|');
        this.supabaseUrl = url.trim();
        this.supabaseKey = key.trim();
      } else {
        alert('Invalid access code format. Use: {"url":"your-url","key":"your-key"} or url|key');
        return;
      }
    }

    // Save configuration
    localStorage.setItem('crm_config', JSON.stringify({
      url: this.supabaseUrl,
      key: this.supabaseKey
    }));

    this.hideLoginModal();
    this.loadLeads();
  },

  logout() {
    localStorage.removeItem('crm_config');
    location.reload();
  },

  hideLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
  },

  async loadLeads() {
    try {
      const response = await fetch(`${this.supabaseUrl}/rest/v1/leads?select=*&order=created_at.desc`, {
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load leads');
      }

      this.leads = await response.json();
      this.filteredLeads = [...this.leads];
      this.renderLeads();
      this.updateStats();
    } catch (error) {
      console.error('Error loading leads:', error);
      this.showError('Failed to load leads. Check your configuration.');
    }
  },

  renderLeads() {
    const tbody = document.getElementById('leadsTableBody');

    if (this.filteredLeads.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="loading">No leads found</td></tr>';
      return;
    }

    tbody.innerHTML = this.filteredLeads.map(lead => `
      <tr class="clickable" onclick="CRM.showLeadDetails('${lead.id}')">
        <td>${lead.first_name} ${lead.last_name}</td>
        <td>${lead.email}</td>
        <td>${lead.company || '-'}</td>
        <td>${lead.interest || '-'}</td>
        <td><span class="status-badge status-${lead.status}">${lead.status}</span></td>
        <td>${new Date(lead.created_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); CRM.showLeadDetails('${lead.id}')">
            View
          </button>
        </td>
      </tr>
    `).join('');
  },

  updateStats() {
    const stats = {
      total: this.leads.length,
      new: this.leads.filter(l => l.status === 'new').length,
      inProgress: this.leads.filter(l => l.status === 'in_progress' || l.status === 'contacted').length,
      converted: this.leads.filter(l => l.status === 'converted').length
    };

    document.getElementById('totalLeads').textContent = stats.total;
    document.getElementById('newLeads').textContent = stats.new;
    document.getElementById('inProgressLeads').textContent = stats.inProgress;
    document.getElementById('convertedLeads').textContent = stats.converted;
  },

  handleSearch(e) {
    const search = e.target.value.toLowerCase();
    this.filteredLeads = this.leads.filter(lead =>
      lead.first_name.toLowerCase().includes(search) ||
      lead.last_name.toLowerCase().includes(search) ||
      lead.email.toLowerCase().includes(search) ||
      (lead.company && lead.company.toLowerCase().includes(search))
    );
    this.applyFilters();
  },

  handleFilter(e) {
    this.applyFilters();
  },

  handleSort(e) {
    this.applyFilters();
  },

  applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    // Apply status filter
    if (statusFilter) {
      this.filteredLeads = this.filteredLeads.filter(lead => lead.status === statusFilter);
    }

    // Apply sorting
    this.filteredLeads.sort((a, b) => {
      switch(sortBy) {
        case 'created_at_desc':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'created_at_asc':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'name_asc':
          return (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name);
        case 'name_desc':
          return (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name);
        default:
          return 0;
      }
    });

    this.renderLeads();
  },

  showLeadDetails(leadId) {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return;

    const modal = document.getElementById('leadModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
      <div class="lead-detail-grid">
        <div class="detail-item">
          <span class="detail-label">Name</span>
          <span class="detail-value">${lead.first_name} ${lead.last_name}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Email</span>
          <span class="detail-value">${lead.email}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Company</span>
          <span class="detail-value">${lead.company || 'Not provided'}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Company Size</span>
          <span class="detail-value">${lead.company_size || 'Not provided'}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Interest</span>
          <span class="detail-value">${lead.interest || 'Not specified'}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Status</span>
          <span class="detail-value">
            <span class="status-badge status-${lead.status}">${lead.status}</span>
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Created</span>
          <span class="detail-value">${new Date(lead.created_at).toLocaleString()}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Lead ID</span>
          <span class="detail-value">${lead.id.substring(0, 8)}...</span>
        </div>
      </div>

      <div class="message-box">
        <h3>Message</h3>
        <p>${lead.message}</p>
      </div>

      ${lead.notes ? `
        <div class="message-box">
          <h3>Notes</h3>
          <p>${lead.notes}</p>
        </div>
      ` : ''}

      <div class="form-group">
        <label>Update Status</label>
        <select id="updateStatus" class="filter-select">
          <option value="new" ${lead.status === 'new' ? 'selected' : ''}>New</option>
          <option value="contacted" ${lead.status === 'contacted' ? 'selected' : ''}>Contacted</option>
          <option value="in_progress" ${lead.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
          <option value="converted" ${lead.status === 'converted' ? 'selected' : ''}>Converted</option>
          <option value="lost" ${lead.status === 'lost' ? 'selected' : ''}>Lost</option>
        </select>
      </div>

      <div class="form-group">
        <label>Notes</label>
        <textarea id="updateNotes" placeholder="Add notes about this lead...">${lead.notes || ''}</textarea>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="CRM.updateLead('${lead.id}')">Save Changes</button>
      </div>
    `;

    modal.classList.add('active');
  },

  async updateLead(leadId) {
    const status = document.getElementById('updateStatus').value;
    const notes = document.getElementById('updateNotes').value;

    try {
      const response = await fetch(`${this.supabaseUrl}/rest/v1/leads?id=eq.${leadId}`, {
        method: 'PATCH',
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ status, notes })
      });

      if (!response.ok) {
        throw new Error('Failed to update lead');
      }

      closeModal();
      this.loadLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('Failed to update lead');
    }
  },

  showError(message) {
    const tbody = document.getElementById('leadsTableBody');
    tbody.innerHTML = `<tr><td colspan="7" class="loading" style="color: var(--danger);">${message}</td></tr>`;
  }
};

// Helper functions
function closeModal() {
  document.getElementById('leadModal').classList.remove('active');
}

// Initialize CRM when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CRM.init());
} else {
  CRM.init();
}
