// resources.js
let currentSubjectId = null;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentSubjectId = urlParams.get('id');
    
    if (!currentSubjectId) {
        document.getElementById('subject-title').innerText = "Error: No Subject Selected";
        return;
    }

    document.getElementById('back-link').href = `subject.html?id=${currentSubjectId}`;
    loadResources();
});

function loadResources() {
    const db = NexusDB.get();
    const subject = db.subjects.find(s => s.id === currentSubjectId);
    
    if (!subject) return;

    // Set UI Basics
    document.getElementById('subject-title').innerText = `${subject.name} - Resources`;
    document.getElementById('exam-countdown').innerText = NexusDB.getDaysLeft(subject.examDate);
    document.getElementById('subject-note').value = subject.resourceNote || "";

    // Ensure global resources array exists
    if (!db.resources) {
        db.resources = [];
        NexusDB.save(db);
    }

    renderResourceLists(db.resources);
}

function renderResourceLists(allResources) {
    // Filter resources strictly for the current subject
    const subjectResources = allResources.filter(r => r.subjectId === currentSubjectId);

    const listFiles = document.getElementById('list-files');
    const listLinks = document.getElementById('list-links');
    const listPyqs = document.getElementById('list-pyqs');

    listFiles.innerHTML = '';
    listLinks.innerHTML = '';
    listPyqs.innerHTML = '';

    subjectResources.forEach(res => {
        const html = `
            <div class="resource-item">
                <a href="${res.url}" target="_blank" class="resource-link">${res.title}</a>
                <button class="delete-btn" onclick="deleteResource('${res.id}')">×</button>
            </div>
        `;

        if (res.type === 'file') listFiles.innerHTML += html;
        if (res.type === 'link') listLinks.innerHTML += html;
        if (res.type === 'pyq') listPyqs.innerHTML += html;
    });

    if(!listFiles.innerHTML) listFiles.innerHTML = `<span style="color: var(--text-secondary); font-size: 0.9rem;">No files added.</span>`;
    if(!listLinks.innerHTML) listLinks.innerHTML = `<span style="color: var(--text-secondary); font-size: 0.9rem;">No links added.</span>`;
    if(!listPyqs.innerHTML) listPyqs.innerHTML = `<span style="color: var(--text-secondary); font-size: 0.9rem;">No PYQs added.</span>`;
}

function openResourceModal() {
    document.getElementById('resource-modal').style.display = 'flex';
}

function closeResourceModal() {
    document.getElementById('resource-modal').style.display = 'none';
    document.getElementById('res-title').value = '';
    document.getElementById('res-url').value = '';
}

function saveResource() {
    const title = document.getElementById('res-title').value;
    let url = document.getElementById('res-url').value;
    const type = document.getElementById('res-type').value;

    if (!title || !url) return alert("Title and URL/Path are required.");

    // Simple fix: If user forgets to add http:// to a link, add it.
    if (type === 'link' && !url.startsWith('http')) {
        url = 'https://' + url;
    }

    const db = NexusDB.get();
    db.resources.push({
        id: 'r_' + Date.now(),
        subjectId: currentSubjectId,
        title: title,
        url: url,
        type: type
    });

    NexusDB.save(db);
    closeResourceModal();
    renderResourceLists(db.resources);
}

function deleteResource(resourceId) {
    if (!confirm("Remove this resource?")) return;
    
    const db = NexusDB.get();
    db.resources = db.resources.filter(r => r.id !== resourceId);
    NexusDB.save(db);
    renderResourceLists(db.resources);
}

function saveSubjectNote() {
    const db = NexusDB.get();
    const subjectIndex = db.subjects.findIndex(s => s.id === currentSubjectId);
    
    if (subjectIndex > -1) {
        db.subjects[subjectIndex].resourceNote = document.getElementById('subject-note').value;
        NexusDB.save(db);
        alert("Subject note saved successfully.");
    }
}