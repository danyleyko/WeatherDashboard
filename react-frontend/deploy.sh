echo "Building app.."
npm run build

echo "Deploying files to server.."
scp -r build/* kirill@149.248.55.101:/var/www/149.248.55.101

echo "Done"
