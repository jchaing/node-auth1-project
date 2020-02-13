const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ api: 'We are live!' });
});

module.exports = router;
