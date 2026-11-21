set -e
git pull
npm run build
pm2 delete axelrod.co || true
pm2 start npm --name "axelrod.co" -- start
