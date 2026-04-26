#!/bin/bash

# Viseyyon Website - Direct FTP Deployment Script
# Usage: ./deploy-to-hostinger.sh [com|tech|both]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# FTP Configuration
FTP_SERVER="ftp.viseyyon.com"
FTP_PORT=21

# Domain-specific settings
FTP_USER_COM="admin"
FTP_USER_TECH="admintech"
REMOTE_PATH_COM="/home/u399810470/domains/viseyyon.com/public_html"
REMOTE_PATH_TECH="/home/u399810470/domains/viseyyon.tech/public_html"

# Check if lftp is installed (better for batch uploads)
if ! command -v lftp &> /dev/null; then
    echo -e "${YELLOW}Warning: lftp not installed. Install it for faster uploads:${NC}"
    echo "  macOS: brew install lftp"
    echo "  Linux: sudo apt-get install lftp"
    echo ""
fi

# Function to deploy using lftp (recommended)
deploy_with_lftp() {
    local domain=$1
    local ftp_user=$2
    local remote_path=$3

    echo -e "${GREEN}Deploying to ${domain} using lftp...${NC}"
    read -sp "Enter FTP password: " FTP_PASSWORD
    echo ""

    lftp -u "${ftp_user},${FTP_PASSWORD}" -e "
        set ftp:ssl-allow no;
        set net:timeout 10;
        set net:reconnect-interval-base 5;
        set net:max-retries 3;
        mirror --reverse \
               --delete \
               --verbose \
               --exclude .git/ \
               --exclude .github/ \
               --exclude .mcp.json \
               --exclude .gitignore \
               --exclude deploy-to-hostinger.sh \
               --exclude MISSING_PRODUCTS.md \
               --exclude DEPLOYMENT_STATUS.md \
               --exclude HOSTINGER_TROUBLESHOOTING.md \
               --exclude FINAL_CONFIGURATION.md \
               ./ ${remote_path}/;
        bye
    " ${FTP_SERVER}

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Successfully deployed to ${domain}${NC}"
    else
        echo -e "${RED}❌ Deployment to ${domain} failed${NC}"
        return 1
    fi
}

# Function to deploy using curl (fallback)
deploy_with_curl() {
    local domain=$1
    local ftp_user=$2
    local remote_path=$3

    echo -e "${YELLOW}Deploying to ${domain} using curl (slower)...${NC}"
    read -sp "Enter FTP password: " FTP_PASSWORD
    echo ""

    # Upload key files
    local files=(
        "index.html"
        "CNAME"
    )

    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            echo "Uploading $file..."
            curl -T "$file" \
                 --user "${ftp_user}:${FTP_PASSWORD}" \
                 "ftp://${FTP_SERVER}${remote_path}/$file"
        fi
    done

    # Upload directories
    local dirs=("pages" "css" "js" "images")
    for dir in "${dirs[@]}"; do
        if [ -d "$dir" ]; then
            echo "Uploading $dir/..."
            find "$dir" -type f | while read file; do
                curl -T "$file" \
                     --user "${ftp_user}:${FTP_PASSWORD}" \
                     --ftp-create-dirs \
                     "ftp://${FTP_SERVER}${remote_path}/$file"
            done
        fi
    done

    echo -e "${GREEN}✅ Deployment to ${domain} complete${NC}"
}

# Main deployment logic
deploy_domain() {
    local domain=$1
    local ftp_user=$2
    local remote_path=$3

    echo ""
    echo "========================================="
    echo "  Deploying to: ${domain}"
    echo "  FTP Server: ${FTP_SERVER}"
    echo "  FTP User: ${ftp_user}"
    echo "  Remote Path: ${remote_path}"
    echo "========================================="
    echo ""

    if command -v lftp &> /dev/null; then
        deploy_with_lftp "$domain" "$ftp_user" "$remote_path"
    else
        deploy_with_curl "$domain" "$ftp_user" "$remote_path"
    fi
}

# Parse arguments
TARGET="${1:-both}"

case $TARGET in
    com)
        deploy_domain "viseyyon.com" "$FTP_USER_COM" "$REMOTE_PATH_COM"
        ;;
    tech)
        deploy_domain "viseyyon.tech" "$FTP_USER_TECH" "$REMOTE_PATH_TECH"
        ;;
    both)
        deploy_domain "viseyyon.tech" "$FTP_USER_TECH" "$REMOTE_PATH_TECH"
        echo ""
        echo "Waiting 2 seconds before next deployment..."
        sleep 2
        deploy_domain "viseyyon.com" "$FTP_USER_COM" "$REMOTE_PATH_COM"
        ;;
    *)
        echo "Usage: $0 [com|tech|both]"
        echo ""
        echo "Examples:"
        echo "  $0 com      # Deploy only to viseyyon.com"
        echo "  $0 tech     # Deploy only to viseyyon.tech"
        echo "  $0 both     # Deploy to both domains (default)"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "Test your websites:"
echo "  http://www.viseyyon.com"
echo "  http://www.viseyyon.tech"
echo ""
