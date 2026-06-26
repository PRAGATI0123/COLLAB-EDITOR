const Document = require('./models/Document');

// What a brand-new document starts as. An empty Delta:
const DEFAULT_DATA = { ops: [] };

async function findOrCreateDocument(id) {
  if (id == null) return;
  const existing = await Document.findById(id);
  if (existing) return existing;
  return Document.create({ _id: id, data: DEFAULT_DATA });
}

function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('🔌 a client connected:', socket.id);

    socket.on('get-document', async (documentId) => {
      const document = await findOrCreateDocument(documentId);

      // A "room" is a named group of sockets. Putting everyone editing the
      // same document into the same room lets us broadcast to JUST them.
      socket.join(documentId);

      socket.emit('load-document', document.data);

      // Relay this client's edits to everyone else in the same room.
      // socket.broadcast.to(room) = "everyone in the room EXCEPT the sender".
      socket.on('send-changes', (delta) => {
        socket.broadcast.to(documentId).emit('receive-changes', delta);
      });

      // Persist the latest full contents.
      socket.on('save-document', async (data) => {
        await Document.findByIdAndUpdate(documentId, { data });
      });
    });

    socket.on('disconnect', () => {
      console.log('👋 a client disconnected:', socket.id);
    });
  });
}

module.exports = registerSocketHandlers;