git pull
npm run build
pm2 delete all
pm2 start npm --name "axelrod.co" -- start