#!/bin/bash

# Check if ImageMagick's identify command is available
if ! command -v identify &>/dev/null; then
    echo "Error: ImageMagick is not installed. Please install it to proceed."
    exit 1
fi

# Loop through all PNG files in the current directory
for file in *.png; do
    # Skip if no PNG files are found
    [ -e "$file" ] || continue

    # Get the width and height using identify
    read width height <<<$(identify -format "%w %h" "$file")

    # Calculate total pixels (width * height)
    total_pixels=$((width * height))

    # Display the results
    echo "$file: Total pixels = $total_pixels, Dimensions = ${width} x ${height}"
done
