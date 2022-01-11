#!/bin/bash
PLUGIN_SLUG="woo-point-of-sale"
PROJECT_PATH=$(pwd)
BUILD_PATH="${PROJECT_PATH}/build"
DEST_PATH="$BUILD_PATH/$PLUGIN_SLUG"

# Exit if any command fails.
set -e

# Change to the expected directory.
cd "$(dirname "$0")"
cd ..

# Enable nicer messaging for build status.
BLUE_BOLD='\033[1;34m';
GREEN_BOLD='\033[1;32m';
RED_BOLD='\033[1;31m';
YELLOW_BOLD='\033[1;33m';
COLOR_RESET='\033[0m';
error () {
	echo -e "\n${RED_BOLD}$1${COLOR_RESET}\n"
}
status () {
	echo -e "\n${BLUE_BOLD}$1${COLOR_RESET}\n"
}
success () {
	echo -e "\n${GREEN_BOLD}$1${COLOR_RESET}\n"
}
warning () {
	echo -e "\n${YELLOW_BOLD}$1${COLOR_RESET}\n"
}

status "💃 Time to release WooCommerce Point of Sale 🙂"

warning "Ready to proceed to create a zip? [Y/N]: "
read -r PROCEED

if [ "$(echo "${PROCEED:-n}" | tr "[:upper:]" "[:lower:]")" != "y" ]; then
	error "Release cancelled!"
	exit 1
fi

status "Generating build directory..."
rm -rf "$BUILD_PATH"
mkdir -p "$DEST_PATH"

warning "Want to install JS dependencies, skip this step if already installed? [Y/N]: "
read -r PROCEED

if [ "$(echo "${PROCEED:-n}" | tr "[:upper:]" "[:lower:]")" != "y" ]; then
	error "Installing JS dependencies skipped!"
else
	status "Installing JS dependencies..."
	npm install
fi

warning "Want to create build of JS files, skip this step if already built? [Y/N]: "
read -r PROCEED

if [ "$(echo "${PROCEED:-n}" | tr "[:upper:]" "[:lower:]")" != "y" ]; then
	error "Building JS files skipped!"
else
	status "Running JS Build..."
	npm run build || exit "$?"
fi

status "Syncing files..."
rsync -rc --exclude-from="$PROJECT_PATH/.distignore" "$PROJECT_PATH/" "$DEST_PATH/" --delete --delete-excluded

status "Generating zip file..."
cd "$BUILD_PATH" || exit
zip -q -r "${PLUGIN_SLUG}.zip" "$PLUGIN_SLUG/"

cd "$PROJECT_PATH" || exit
mv "$BUILD_PATH/${PLUGIN_SLUG}.zip" "$PROJECT_PATH"
status "${PLUGIN_SLUG}.zip file generated!"

success "Done. You've built WooCommerce Point of Sale zip! 🎉 "
rm -rf "$BUILD_PATH"
