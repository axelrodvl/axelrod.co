pm2 delete all
npm run build
pm2 start npm --name "axelrod.co" -- start