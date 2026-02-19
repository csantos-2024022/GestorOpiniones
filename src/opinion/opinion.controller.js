import Opinion from './opinion.model.js';

export const createOpinion = async (req, res) => {
  try {

    const { title, content } = req.body;

    const opinion = await Opinion.create({
      title,
      content,
      user: req.uid   // viene del validateJWT
    });

    res.status(201).json({
      message: 'Opinion created',
      opinion
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error creating opinion',
      error: error.message
    });
  }
};

export const getMyOpinions = async (req, res) => {
  try {

    const opinions = await Opinion.find({ user: req.uid });

    res.json({
      message: 'My opinions',
      opinions
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error getting opinions',
      error: error.message
    });
  }
};
