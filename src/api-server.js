// Simple Express API server for teaching CRUD and status codes
import express from 'express';
const app = express();
const PORT = 3000;
const SECRET_TOKEN = 'my-secret-token'; // Simple token for demo auth

app.use(express.json());

// In-memory data store
let posts = [
    { id: 1, userId: 1, title: 'First Post', body: 'This is the first post.', published: true, tags: ['news', 'tech'], metadata: { views: 150 } },
    { id: 2, userId: 2, title: 'Second Post', body: 'Another interesting article.', published: false, tags: ['lifestyle'], metadata: { views: 50 } },
    { id: 3, userId: 1, title: 'Third Post about Tech', body: 'Diving deep into JavaScript.', published: true, tags: ['tech', 'code'], metadata: { views: 300 } },
    { id: 4, userId: 3, title: 'Travel Adventures', body: 'Exploring the mountains.', published: true, tags: ['travel', 'adventure'], metadata: { views: 220 } },
    { id: 5, userId: 2, title: 'Cooking Tips', body: 'Easy recipes for beginners.', published: false, tags: ['food', 'cooking'], metadata: { views: 95 } },
    // Problematic Data:
    { id: 6, userId: 99, title: 'Post by Non-existent User', body: 'This user ID does not exist in the users list.', published: true, tags: ['orphan'], metadata: {} },
    { id: 7, userId: 1, title: 'Post with Invalid Tag Type', body: 'Tags should be an array.', published: true, tags: 'invalid-tag', metadata: { views: 10 } }, // tags should be array
    { id: 8, userId: 2, title: null, body: 'Post with null title', published: true, tags: ['data-issue'], metadata: { views: 5 } }, // title is null
    { id: 9, userId: 3, body: 'Post missing title', published: false, tags: ['incomplete'], metadata: {} }, // title field missing
];

let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    // Problematic Data:
    { id: 4, name: 'David', email: 'david-invalid-email' }, // Invalid email format
    { id: 5, email: 'eve@example.com' }, // Missing name
];

let comments = [
    { id: 101, postId: 1, userId: 2, text: 'Great article!' },
    { id: 102, postId: 1, userId: 3, text: 'Very informative, thanks.' },
    { id: 103, postId: 3, userId: 1, text: 'Nice code examples.' },
    { id: 104, postId: 4, userId: 2, text: 'Beautiful pictures!' },
    // Problematic Data:
    { id: 105, postId: 99, userId: 1, text: 'Comment on non-existent post.' }, // postId 99 doesn't exist
    { id: 106, postId: 1, userId: 99, text: 'Comment by non-existent user.' }, // userId 99 doesn't exist
    { id: 107, postId: 2, userId: 3 }, // Missing text field
    { id: 108, postId: 5, userId: 1, text: null }, // text is null
];

// Helper Functions
const findPostById = (id) => posts.find(p => p.id === Number(id));
const findUserById = (id) => users.find(u => u.id === Number(id));
const findCommentById = (id) => comments.find(c => c.id === Number(id));
const getNextId = (collection) => collection.length ? Math.max(...collection.map(item => item.id)) + 1 : 1;
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Middleware for simulated authentication
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing Bearer token' });
    }
    const token = authHeader.split(' ')[1];
    if (token !== SECRET_TOKEN) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = { id: 'authenticated_user', roles: ['admin'] }; // Simulate user context
    next();
};

// GET all posts
app.get('/posts', (req, res) => {
    let filteredPosts = [...posts];

    // Filtering by userId
    if (req.query.userId) {
        const userId = Number(req.query.userId);
        filteredPosts = filteredPosts.filter(p => p.userId === userId);
    }

    // Filtering by published status
    if (req.query.published) {
        const published = req.query.published.toLowerCase() === 'true';
        filteredPosts = filteredPosts.filter(p => p.published === published);
    }

    // Sorting
    if (req.query.sortBy) {
        const sortBy = req.query.sortBy;
        const order = req.query.order === 'desc' ? -1 : 1;
        filteredPosts.sort((a, b) => {
            // Handle potential null/undefined during sort
            const valA = a[sortBy] ?? ''; // Default to empty string if null/undefined
            const valB = b[sortBy] ?? '';
            if (valA < valB) return -1 * order;
            if (valA > valB) return 1 * order;
            return 0;
        });
    }

    res.status(200).json(filteredPosts);
});

// GET a single post by id
app.get('/posts/:id', (req, res) => {
    const post = findPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
});

// POST create a new post
app.post('/posts', (req, res) => {
    const { userId, title, body, published = false, tags = [], metadata = {} } = req.body;

    // Basic Validation
    if (!userId || !title || !body) {
        return res.status(400).json({ error: 'Missing required fields: userId, title, body' });
    }
    if (typeof title !== 'string' || title.length < 3) {
        return res.status(400).json({ error: 'Validation Error: Title must be a string of at least 3 characters.' });
    }
    if (!findUserById(userId)) {
        return res.status(400).json({ error: `Validation Error: User with id ${userId} does not exist.` });
    }
    if (tags && !Array.isArray(tags)) {
        return res.status(400).json({ error: 'Validation Error: tags must be an array.' });
    }

    const newPost = {
        id: getNextId(posts),
        userId: Number(userId),
        title,
        body,
        published: Boolean(published),
        tags: Array.isArray(tags) ? tags : [],
        metadata: typeof metadata === 'object' && metadata !== null ? metadata : {}
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT update a post
app.put('/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return res.status(404).json({ error: 'Post not found' });

    const { userId, title, body, published, tags, metadata } = req.body;

    // Validation (similar to POST)
    if (!userId || !title || !body || published === undefined || !tags || !metadata) {
        return res.status(400).json({ error: 'Missing fields for full update: userId, title, body, published, tags, metadata' });
    }
    if (typeof title !== 'string' || title.length < 3) {
        return res.status(400).json({ error: 'Validation Error: Title must be a string of at least 3 characters.' });
    }
    if (!findUserById(userId)) {
        return res.status(400).json({ error: `Validation Error: User with id ${userId} does not exist.` });
    }
    if (tags && !Array.isArray(tags)) {
        return res.status(400).json({ error: 'Validation Error: tags must be an array.' });
    }

    const updatedPost = {
        id: postId,
        userId: Number(userId),
        title,
        body,
        published: Boolean(published),
        tags: Array.isArray(tags) ? tags : [],
        metadata: typeof metadata === 'object' && metadata !== null ? metadata : {}
    };
    posts[postIndex] = updatedPost;
    res.status(200).json(updatedPost);
});

// PATCH partially update a post
app.patch('/posts/:id/publish', (req, res) => {
    const post = findPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const { published } = req.body;
    if (typeof published !== 'boolean') {
        return res.status(400).json({ error: 'Invalid field: published must be a boolean' });
    }
    post.published = published;
    res.status(200).json(post);
});

// DELETE a post
app.delete('/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const index = posts.findIndex(p => p.id === postId);
    if (index === -1) return res.status(404).json({ error: 'Post not found' });

    // Cascade delete comments associated with this post
    comments = comments.filter(c => c.postId !== postId);

    posts.splice(index, 1);
    res.status(204).send(); // No content on successful deletion
});

// GET all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// GET a single user by id
app.get('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
});

// POST create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing required fields: name, email' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Validation Error: Invalid email format.' });
    }
    // Check if email already exists (simple example)
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'Conflict: Email already in use.' }); // 409 Conflict might be better here
    }

    const newUser = { id: getNextId(users), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT update a user
app.put('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing required fields: name, email' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Validation Error: Invalid email format.' });
    }
    // Check if email exists for *another* user
    if (users.some(u => u.email === email && u.id !== userId)) {
        return res.status(400).json({ error: 'Conflict: Email already in use by another user.' });
    }

    const updatedUser = { id: userId, name, email };
    users[userIndex] = updatedUser;
    res.status(200).json(updatedUser);
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    // Optional: Handle user deletion impact (e.g., nullify their comments/posts?)
    // For simplicity, we'll just delete the user here.
    // posts = posts.map(p => p.userId === userId ? { ...p, userId: null } : p); // Example: Nullify userId in posts
    // comments = comments.map(c => c.userId === userId ? { ...c, userId: null } : c); // Example: Nullify userId in comments

    users.splice(index, 1);
    res.status(204).send();
});

// GET comments for a post
app.get('/posts/:postId/comments', (req, res) => {
    const postId = Number(req.params.postId);
    // We don't strictly need to check if post exists here if we just want comments for that ID
    // if (!findPostById(postId)) {
    //     return res.status(404).json({ error: 'Post not found' });
    // }
    const postComments = comments.filter(c => c.postId === postId);
    res.status(200).json(postComments); // Will return empty array if post has no comments or doesn't exist
});

// POST add a comment to a post
app.post('/posts/:postId/comments', (req, res) => {
    const postId = Number(req.params.postId);
    if (!findPostById(postId)) {
        return res.status(400).json({ error: `Validation Error: Post with id ${postId} does not exist.` });
    }
    const { userId, text } = req.body;
    if (!userId || !text) {
        return res.status(400).json({ error: 'Missing fields: userId, text' });
    }
    if (!findUserById(userId)) {
        return res.status(400).json({ error: `Validation Error: User with id ${userId} does not exist.` });
    }
    if (typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Validation Error: Comment text cannot be empty.' });
    }

    const newComment = { id: getNextId(comments), postId, userId: Number(userId), text };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// GET secure data (requires authentication)
app.get('/secure-data', authenticate, (req, res) => {
    // This route is protected by the 'authenticate' middleware
    res.status(200).json({ message: 'This is secure data, access granted.', user: req.user });
});

// GET slow response (simulates delay)
app.get('/slow-response', (req, res) => {
    setTimeout(() => {
        res.status(200).json({ message: 'This took 2 seconds!' });
    }, 2000); // 2 second delay
});

// GET text response (returns plain text)
app.get('/text-response', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('This is a plain text response.');
});

// GET internal error (always returns 500)
app.get('/internal-error', (req, res) => {
    console.error('[Simulated Error] An unexpected issue occurred.'); // Log the simulated error
    res.status(500).json({ error: 'Internal Server Error (Simulated)' });
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
    console.log('--- Resources ---');
    console.log('  /posts (CRUD, Filter, Sort, PATCH publish)');
    console.log('  /users (CRUD)');
    console.log('  /comments (CRUD)');
    console.log('  /posts/:postId/comments (Read, Create)');
    console.log('--- Utility ---');
    console.log('  /secure-data (GET, Auth Required)');
    console.log('  /slow-response (GET, 2s Delay)');
    console.log('  /text-response (GET, Plain Text)');
    console.log('  /internal-error (GET, Always 500)');
    console.log('--- Initial Data Contains Issues for Testing! ---');
}); 