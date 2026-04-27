-- Simple Leads Table for Viseyyon CRM
-- Copy and paste this entire content into Supabase SQL Editor

-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  company_size VARCHAR(50),
  interest VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  source VARCHAR(50) DEFAULT 'contact_form',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Disable RLS for now (we'll enable later)
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
