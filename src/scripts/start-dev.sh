#!/bin/bash

echo "👉 Starting Metro Bundler (in background)..."
npx react-native start &

sleep 3

echo "🚀 Running on Android device/emulator..."
npx react-native run-android --no-jetifier --variant=release

echo "✅ Done!"
