// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = async (req, res) => {
  res.status(200).json({
    code: 200,
    question:
      "You  don't know how to start ? Hit / to learn more about the system 😁",
  });
};

export default handler;
