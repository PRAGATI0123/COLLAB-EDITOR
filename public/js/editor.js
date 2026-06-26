// We always arrive with a document ID in the URL. decodeURIComponent reverses
// the encoding the landing page did, so "/team%20notes" becomes "team notes".
let documentId = decodeURIComponent(window.location.pathname.slice(1));

// If there's somehow no ID, send the user back to the home page to pick one.
if (!documentId) {
  window.location.href = '/';
}

// --- 2. Set up the Quill editor -------------------------------------------
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  ['clean'],
];

const quill = new Quill('#editor', {
  theme: 'snow',
  modules: { toolbar: TOOLBAR_OPTIONS },
  placeholder: 'Start writing…',
});

// Lock the editor until the server sends us the saved content,
// so the user can't type into an empty doc that's about to be replaced.
quill.disable();
quill.setText('Loading…');

// --- 3. Connect to the server over WebSockets -----------------------------
const socket = io();

// Tell the server which document we want. The server will put us in a "room"
// named after the document ID and send back the saved contents.
socket.emit('get-document', documentId);

socket.once('load-document', (data) => {
  quill.setContents(data);
  quill.enable();
});

// --- 4. Send OUR edits to the server --------------------------------------
quill.on('text-change', (delta, oldDelta, source) => {
  // 'source' tells us who caused the change. We ONLY broadcast changes the
  // user made by typing ('user'). Changes we apply from the network have
  // source 'api' — if we re-broadcast those, we'd create an infinite loop.
  if (source !== 'user') return;
  socket.emit('send-changes', delta);
});

// --- 5. Apply OTHER people's edits ----------------------------------------
socket.on('receive-changes', (delta) => {
  quill.updateContents(delta); // source defaults to 'api', so step 4 ignores it
});

// --- 6. Autosave to the database every 2 seconds --------------------------
const SAVE_INTERVAL_MS = 2000;
setInterval(() => {
  socket.emit('save-document', quill.getContents());
}, SAVE_INTERVAL_MS);