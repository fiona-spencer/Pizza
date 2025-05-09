import Store from '../models/store.model.js';

// GET store status
export const getStoreStatus = async (req, res) => {
  try {
    const store = await Store.findOne();
    if (!store) {
      return res.status(404).json({ message: 'Store status not found' });
    }
    res.json(store);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving store status' });
  }
};

// POST /openClose – Update only isOpen status
export const saveStoreStatus = async (req, res) => {
  const { isOpen } = req.body;

  try {
    let store = await Store.findOne();

    if (!store) {
      store = new Store({ isOpen, openHour: 9, closeHour: 21 });
    } else {
      store.isOpen = isOpen;
    }

    await store.save();
    res.status(200).json({ message: 'Store open/close status updated', store });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving store status' });
  }
};

// POST /hours – Update only openHour and closeHour
export const saveStoreHours = async (req, res) => {
  const { openHour, closeHour } = req.body;

  try {
    let store = await Store.findOne();

    if (!store) {
      store = new Store({ isOpen: false, openHour, closeHour });
    } else {
      store.openHour = openHour;
      store.closeHour = closeHour;
    }

    await store.save();
    res.status(200).json({ message: 'Store hours updated', store });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving store hours' });
  }
};
