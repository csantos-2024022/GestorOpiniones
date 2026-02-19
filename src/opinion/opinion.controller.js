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

export const updateOpinion = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, content } = req.body;

    const opinion = await Opinion.findById(id);

    if (!opinion) {
      return res.status(404).json({ message: 'Opinion not found' });
    }

    if (opinion.user.toString() !== req.uid) {
      return res.status(403).json({ message: 'You cannot edit this opinion' });
    }

    opinion.title = title || opinion.title;
    opinion.content = content || opinion.content;

    await opinion.save();

    res.json({
      message: 'Opinion updated',
      opinion
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error updating opinion',
      error: error.message
    });
  }
};

export const deleteOpinion = async (req, res) => {
  try {

    const { id } = req.params;

    const opinion = await Opinion.findById(id);

    if (!opinion) {
      return res.status(404).json({ message: 'Opinion not found' });
    }

    if (opinion.user.toString() !== req.uid) {
      return res.status(403).json({ message: 'You cannot delete this opinion' });
    }

    await opinion.deleteOne();

    res.json({
      message: 'Opinion deleted'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting opinion',
      error: error.message
    });
  }
};