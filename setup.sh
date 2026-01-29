#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Outbound Visa Customer Feedback Setup${NC}"
echo -e "${BLUE}========================================${NC}\n"

if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo -e "${RED}Error: Windows detected!${NC}"
    echo -e "${YELLOW}Please run this script in WSL (Windows Subsystem for Linux).${NC}"
    echo -e "Install WSL: https://docs.microsoft.com/en-us/windows/wsl/install"
    exit 1
fi

check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is not installed"
        return 1
    fi
}

install_bun() {
    echo -e "\n${YELLOW}Installing Bun...${NC}"
    curl -fsSL https://bun.sh/install | bash

    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"

    if [[ "$SHELL" == *"zsh"* ]]; then
        echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.zshrc
        echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.zshrc
    else
        echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
        echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bashrc
    fi

    echo -e "${GREEN}✓${NC} Bun installed successfully"
}

install_docker() {
    echo -e "\n${YELLOW}Docker is not installed.${NC}"
    echo -e "Please install Docker from: https://docs.docker.com/get-docker/"

    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "For macOS: https://docs.docker.com/desktop/install/mac-install/"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo -e "For Linux: https://docs.docker.com/engine/install/"
    fi

    echo -e "\n${RED}Please install Docker and run this script again.${NC}"
    exit 1
}

install_git() {
    echo -e "\n${YELLOW}Installing Git...${NC}"

    if [[ "$OSTYPE" == "darwin"* ]]; then
        if ! command -v brew &> /dev/null; then
            echo -e "${YELLOW}Installing Homebrew...${NC}"
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install git
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y git
        elif command -v yum &> /dev/null; then
            sudo yum install -y git
        else
            echo -e "${RED}Could not install Git automatically. Please install it manually.${NC}"
            exit 1
        fi
    fi

    echo -e "${GREEN}✓${NC} Git installed successfully"
}

echo -e "${BLUE}Checking system requirements...${NC}\n"

OS_NAME=$(uname -s)
echo -e "Operating System: ${GREEN}$OS_NAME${NC}"

if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "Platform: ${GREEN}macOS${NC}"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo -e "Platform: ${GREEN}Linux${NC}"
else
    echo -e "Platform: ${GREEN}WSL/Other${NC}"
fi

echo -e "\n${BLUE}Checking required tools...${NC}\n"

MISSING_TOOLS=0

if ! check_command git; then
    MISSING_TOOLS=1
    INSTALL_GIT=1
fi

if ! check_command bun; then
    MISSING_TOOLS=1
    INSTALL_BUN=1
fi

if ! check_command docker; then
    MISSING_TOOLS=1
    INSTALL_DOCKER=1
fi

if [ $MISSING_TOOLS -eq 1 ]; then
    echo -e "\n${YELLOW}Some tools are missing. Installing...${NC}"

    if [ ! -z "$INSTALL_GIT" ]; then
        install_git
    fi

    if [ ! -z "$INSTALL_BUN" ]; then
        install_bun
    fi

    if [ ! -z "$INSTALL_DOCKER" ]; then
        install_docker
    fi
else
    echo -e "\n${GREEN}All required tools are installed!${NC}"
fi

echo -e "\n${BLUE}Checking Bun version...${NC}"
bun --version

echo -e "\n${BLUE}Installing project dependencies...${NC}"
bun install

if [ ! -f .env ]; then
    echo -e "\n${YELLOW}No .env file found. Creating from template...${NC}"
    cat > .env << 'EOF'
NEXT_PUBLIC_FE_DOMAIN=http://localhost:3000
NEXT_PUBLIC_FEEDBACK_POLLING_MS=5000

DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

SUPABASE_OAUTH_CLIENT_ID=your-client-id
SUPABASE_OAUTH_CLIENT_SECRET=your-client-secret

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EOF
    echo -e "${GREEN}✓${NC} .env file created"
    echo -e "${RED}⚠${NC}  ${YELLOW}Please update the .env file with your actual credentials${NC}"
fi

echo -e "\n${BLUE}Verifying Node.js compatibility...${NC}"
NODE_VERSION=$(node --version 2>/dev/null || echo "none")
if [ "$NODE_VERSION" != "none" ]; then
    echo -e "Node.js version: ${GREEN}$NODE_VERSION${NC}"
fi

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Update the ${YELLOW}.env${NC} file with your credentials"
echo -e "2. Run ${YELLOW}bun run dev${NC} to start the development server"
echo -e "3. Visit ${YELLOW}http://localhost:3000${NC} in your browser\n"
