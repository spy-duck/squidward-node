#!/usr/bin/env bash

# === Настройки ===
SCRIPT_NAME="squidward-node"
SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

COMP_FILE="/etc/bash_completion.d/$SCRIPT_NAME"

install() {
    echo "Installing..."
    chmod +x $SCRIPT_PATH
    echo "Not implemented yet."
}

upgrade() {
    echo "Updating..."
    cd $SCRIPT_DIR
    docker compose pull
    docker compose down && docker compose up -d && docker compose logs -f
}

uninstall() {
    read -rp "This action is IRREVERSIBLE.
All node data will be DELETED.
Continue? [y/N] " answer
      if [[ "$answer" =~ ^[Yy]$ ]]; then
        echo "Deleting..."
        sudo rm $COMP_FILE
        sudo rm /usr/local/bin/$SCRIPT_NAME
        sudo rm -rf SCRIPT_DIR/.data
        sudo rm .env
      fi
}

enable_autocomplete() {
    if [[ ! -f "$COMP_FILE" ]]; then
        echo "Adding autocompletion..."
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
        echo "Autocompletion has been added.\n"
        echo "Restart the terminal or run 'source /etc/bash_completion'."
    fi
}

ACTION="$1"

if [[ -z "$ACTION" ]]; then
    echo "Usage: $0 {install|upgrade|remove}"
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
    upgrade) upgrade ;;
    uninstall)  uninstall ;;
    *)
        echo "Unknown action: $ACTION"
        echo "Available actions: install, upgrade, uninstall"
        exit 1
        ;;
esac