const handleRoot = (req, res) => {
  return res.json({ message: "message from get req on /" });
};

export default handleRoot;
