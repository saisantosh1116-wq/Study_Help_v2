// syllabus.js
let currentSubjectId = null; // Global reference for the loaded subject

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentSubjectId = urlParams.get('id');
    
    if (!currentSubjectId) {
        document.getElementById('subject-title').innerText = "Error: No Subject Selected";
        return;
    }

    document.getElementById('back-link').href = `subject.html?id=${currentSubjectId}`;
    loadSyllabus(currentSubjectId);
});

function loadSyllabus(subjectId) {
    const db = NexusDB.get();
    const subjectIndex = db.subjects.findIndex(s => s.id === subjectId);
    
    if (subjectIndex === -1) return;
    
    const subject = db.subjects[subjectIndex];
    document.getElementById('subject-title').innerText = `${subject.name} - Syllabus`;
    document.getElementById('exam-countdown').innerText = NexusDB.getDaysLeft(subject.examDate);

    // Initialize an empty syllabus array if it doesn't exist
    if (!subject.syllabus) {
        subject.syllabus = [];
        db.subjects[subjectIndex] = subject;
        NexusDB.save(db);
    }

    renderTopics(subject.syllabus);
    updateMetrics(subject.syllabus);
}

function renderTopics(topics) {
    const container = document.getElementById('topics-container');
    container.innerHTML = '';

    if (topics.length === 0) {
        container.innerHTML = `<div class="nexus-card" style="text-align:center; color:var(--text-secondary);">No topics added yet. Click "+ Add Topic" to start building your syllabus.</div>`;
        return;
    }

    topics.forEach(topic => {
        let borderColor = 'var(--border)';
        if (topic.status === 'done') borderColor = 'var(--accent)';
        if (topic.status === 'revise') borderColor = 'var(--warning)';
        if (topic.status === 'review') borderColor = 'var(--danger)';

        const card = document.createElement('div');
        card.className = 'topic-card';
        card.style.borderColor = borderColor;
        
        card.innerHTML = `
            <div class="topic-controls">
                <h3 style="margin: 0 0 10px 0;">${topic.title}</h3>
                
                <label class="status-label" style="color: ${topic.status === 'done' ? 'var(--accent)' : ''}">
                    <input type="radio" name="status_${topic.id}" value="done" ${topic.status === 'done' ? 'checked' : ''} 
                           onchange="updateTopicStatus('${topic.id}', 'done')"> Done
                </label>
                <label class="status-label" style="color: ${topic.status === 'revise' ? 'var(--warning)' : ''}">
                    <input type="radio" name="status_${topic.id}" value="revise" ${topic.status === 'revise' ? 'checked' : ''} 
                           onchange="updateTopicStatus('${topic.id}', 'revise')"> Should be revised
                </label>
                <label class="status-label" style="color: ${topic.status === 'review' ? 'var(--danger)' : ''}">
                    <input type="radio" name="status_${topic.id}" value="review" ${topic.status === 'review' ? 'checked' : ''} 
                           onchange="updateTopicStatus('${topic.id}', 'review')"> Mark for review
                </label>

                <!-- NEW: Edit/Delete Actions -->
                <div class="topic-actions">
                    <button class="action-link" style="color: var(--text-secondary);" onclick="editTopic('${topic.id}')">Edit</button>
                    <button class="action-link" style="color: var(--danger);" onclick="deleteTopic('${topic.id}')">Delete</button>
                </div>
            </div>
            <div class="topic-notes">
                <textarea placeholder="Add your notes, doubts, or key takeaways here..." 
                          onblur="updateTopicNotes('${topic.id}', this.value)">${topic.notes || ''}</textarea>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Topic CRUD Logic ---

function openSyllabusModal() {
    document.getElementById('modal-title').innerText = "Add New Topic";
    document.getElementById('syllabus-modal').style.display = 'flex';
}

function closeSyllabusModal() {
    document.getElementById('syllabus-modal').style.display = 'none';
    document.getElementById('topic-title').value = '';
    document.getElementById('edit-topic-id').value = '';
}

function saveTopic() {
    const title = document.getElementById('topic-title').value;
    const editId = document.getElementById('edit-topic-id').value;
    
    if (!title) return alert("Topic title cannot be empty.");

    const db = NexusDB.get();
    const subject = db.subjects.find(s => s.id === currentSubjectId);

    if (editId) {
        // Update
        const topic = subject.syllabus.find(t => t.id === editId);
        if (topic) topic.title = title;
    } else {
        // Create
        subject.syllabus.push({
            id: 't_' + Date.now(),
            title: title,
            status: 'pending',
            notes: ''
        });
    }

    NexusDB.save(db);
    closeSyllabusModal();
    loadSyllabus(currentSubjectId); // Refresh UI
}

function editTopic(topicId) {
    const db = NexusDB.get();
    const subject = db.subjects.find(s => s.id === currentSubjectId);
    const topic = subject.syllabus.find(t => t.id === topicId);
    
    if (!topic) return;

    document.getElementById('modal-title').innerText = "Edit Topic";
    document.getElementById('topic-title').value = topic.title;
    document.getElementById('edit-topic-id').value = topic.id;
    document.getElementById('syllabus-modal').style.display = 'flex';
}

function deleteTopic(topicId) {
    if (!confirm("Are you sure you want to delete this topic?")) return;
    
    const db = NexusDB.get();
    const subject = db.subjects.find(s => s.id === currentSubjectId);
    
    subject.syllabus = subject.syllabus.filter(t => t.id !== topicId);
    NexusDB.save(db);
    loadSyllabus(currentSubjectId);
}

// --- Quick DB Updates ---

function updateTopicStatus(topicId, newStatus) {
    const db = NexusDB.get();
    const subject = db.subjects.find(s => s.id === currentSubjectId);
    const topic = subject.syllabus.find(t => t.id === topicId);
    
    if (topic) {
        topic.status = newStatus;
        NexusDB.save(db);
        loadSyllabus(currentSubjectId);
    }
}

function updateTopicNotes(topicId, newNotes) {
    const db = NexusDB.get();
    const subject = db.subjects.find(s => s.id === currentSubjectId);
    const topic = subject.syllabus.find(t => t.id === topicId);
    
    if (topic && topic.notes !== newNotes) {
        topic.notes = newNotes;
        NexusDB.save(db);
    }
}

// --- Dynamic Progress Ring Logic ---
function updateMetrics(topics) {
    const total = topics.length;
    const completed = topics.filter(t => t.status === 'done').length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById('topics-total-count').innerText = total;
    document.getElementById('topics-completed-count').innerText = completed;
    document.getElementById('progress-text').innerText = `${percentage}%`;

    const ring = document.getElementById('progress-ring');
    
    // Check if light mode is active to apply correct empty track color
    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    const emptyColor = isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
    
    ring.style.background = `conic-gradient(var(--accent) ${percentage}%, ${emptyColor} ${percentage}%)`;
}