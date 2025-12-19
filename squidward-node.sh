#!/usr/bin/env bash

# === SETUP ===
SCRIPT_NAME="squidward-node"
SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
GIT_REPO="https://raw.githubusercontent.com/spy-duck/squidward-node/refs/heads/main/"
COMP_FILE="/etc/bash_completion.d/$SCRIPT_NAME"
LOGFILE=""

function init_logger() {
  if [[ $1 == "-F" || $1 == "--file" ]]; then
    LOGFILE=$2
  fi
}

function get_level_badge() {
    case $1 in
      "INFO")
        echo "\e[0;34m$log_level\033[0m"
        ;;
      "WARN")
        echo "\e[0;33m$log_level\033[0m"
        ;;
      "ERROR")
        echo "\e[0;31m$log_level\033[0m"
        ;;
      "DEBUG")
        echo "\e[0;35m$log_level\033[0m"
        ;;
      *)
        echo $log_level
        ;;
    esac
}

function log() {
  local log_level=$1
  local message=$2
  local script_name=$(basename $0)
  local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
  local badge=$(get_level_badge $log_level)

  echo -e "$timestamp [$badge] [$script_name] $message"

  if [[ -n "$LOGFILE" ]]; then
    echo "$timestamp [$log_level] [$script_name] $message" >> $LOGFILE
  fi
}

function log_info() {
  local message=$1
  log "INFO" "$message"
}

function log_warn() {
  local message=$1
  log "WARN" "$message"
}

function log_error() {
  local message=$1
  log "ERROR" "$message"
}

function log_debug() {
  local message=$1
  log "DEBUG" "$message"
}


##
# INSTALL
##
install() {
    log_info "Installing..."
    chmod +x $SCRIPT_PATH
    log_error "Not implemented yet."
}

##
# UPGRADE
##
do_upgrade_shell() {
  log_info "Checking for updates..."
  local TMP_FILE
  TMP_FILE="$(mktemp)"

  wget "$GIT_REPO/squidward-node.sh" -O $TMP_FILE

  if ! cmp -s "$SCRIPT_PATH" "$TMP_FILE"; then
      log_info "New script version found. Updating..."
      chmod 755 "$TMP_FILE"
      mv "$TMP_FILE" "$SCRIPT_PATH"
      log_info "Restarting script..."
      exec "$SCRIPT_PATH" "$@"
  else
      log_info "Script is up to date."
      rm "$TMP_FILE"
  fi
}

upgrade() {
    log_info "Updating..."
    cd $SCRIPT_DIR

    do_upgrade_shell "$@"

    log_info "Get docker-compose.yml"
    wget "$GIT_REPO/docker-compose.yml" -O ./docker-compose.yml

    log_info "Pull docker updates"
    docker compose pull

    log_info "Restart docker"
    docker compose down && docker compose up -d && docker compose logs -f
}

##
# UNINSTALL
##
uninstall() {
    read -rp "This action is IRREVERSIBLE.
All node data will be DELETED.
Continue? [y/N] " answer
      if [[ "$answer" =~ ^[Yy]$ ]]; then
        log_info "Deleting..."
        sudo rm $COMP_FILE
        sudo rm /usr/local/bin/$SCRIPT_NAME
        sudo rm -rf SCRIPT_DIR/.data
        sudo rm .env
      fi
}


##
# AUTOCOMPLETE
##
enable_autocomplete() {
    if [[ ! -f "$COMP_FILE" ]]; then
        log_info "Adding autocompletion..."
        sudo ln -s $SCRIPT_PATH /usr/local/bin/$SCRIPT_NAME
        sudo bash -c "cat > '$COMP_FILE'" <<EOF
# Автодополнение для $SCRIPT_NAME
_${SCRIPT_NAME}_completion() {
    local cur opts
    COMPREPLY=()
    cur="\${COMP_WORDS[COMP_CWORD]}"
    opts="install upgrade uninstall"

    COMPREPLY=( \$(compgen -W "\$opts" -- "\$cur") )
    return 0
}
complete -F _${SCRIPT_NAME}_completion $SCRIPT_NAME
EOF
        log_info "Autocompletion has been added.\n"
        log_info "Restart the terminal or run 'source /etc/bash_completion'."
    fi
}

##
# SCRIPT
##

ACTION="$1"

if [[ -z "$ACTION" ]]; then
    log_warn "Usage: $0 {install|upgrade|remove}"
    exit 1
fi

if [[ ! -f "$COMP_FILE" ]]; then
    read -rp "Want to add autocompletion for '$SCRIPT_NAME'? [y/N] " answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        enable_autocomplete
    fi
fi

case "$ACTION" in
    install) install ;;
    upgrade) upgrade "$@";;
    uninstall)  uninstall ;;
    *)
        log_error "Unknown action: $ACTION"
        log_info "Available actions: install, upgrade, uninstall"
        exit 1
        ;;
esac