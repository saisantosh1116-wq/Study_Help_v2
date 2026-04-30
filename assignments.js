// --- assignments.js ---
let currentSubjectId = null;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentSubjectId = urlParams.get('id');
    const db = NexusDB.get();

    // If we routed here from a specific subject, transform the page into "Subject Mode"
    if (currentSubjectId) {
        const subject = db.subjects.find(s => s.id === currentSubjectId);
        if (subject) {
            document.getElementById('page-title').innerText = `${subject.name} - Assignments`;
            document.getElementById('back-link').href = `subject.html?id=${currentSubjectId}`;
            document.getElementById('back-link').innerHTML = `&larr; BACK TO SUBJECT`;
        }
    }

    renderAssignments();
    populateSubjectDropdown();
});

function renderAssignments() {
    const db = NexusDB.get();
    const grid = document.getElementById('assignment-grid');
    grid.innerHTML = ''; 

    // Apply filter if we are in Subject Mode
    let filteredAssignments = db.assignments;
    if (currentSubjectId) {
        filteredAssignments = filteredAssignments.filter(a => a.subjectId === currentSubjectId);
    }

    if (filteredAssignments.length === 0) {
        grid.innerHTML = `<span style="color: var(--text-secondary);">No assignments found for this view.</span>`;
        return;
    }

    const sorted = filteredAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    sorted.forEach(task => {
        const daysLeft = NexusDB.getDaysLeft(task.dueDate);
        const subject = db.subjects.find(s => s.id === task.subjectId);
        
        let statusColor = 'var(--text-secondary)';
        if (daysLeft < 0) statusColor = 'var(--danger)';
        else if (daysLeft <= 3) statusColor = 'var(--warning)';
        else statusColor = 'var(--accent)';

        grid.innerHTML += `
            <div class="nexus-card" style="border-left: 4px solid ${statusColor}; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h3 style="margin: 0 0 8px 0;">${task.title}</h3>
                    <span style="font-size: 0.85rem; color: var(--text-secondary);">${subject ? subject.name : 'General'}</span>
                </div>
                <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
                    <div style="font-size: 2rem; font-weight: bold; color: ${statusColor};">${daysLeft}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 10px;">Days Left</div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="editAssignment('${task.id}')" style="background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-weight:bold;">Edit</button>
                        <button onclick="deleteAssignment('${task.id}')" style="background:transparent; border:none; color:var(--danger); cursor:pointer; font-weight:bold;">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function populateSubjectDropdown() {
    const select = document.getElementById('task-subject');
    select.innerHTML = '<option value="none" style="color: black;">General (No Subject)</option>';
    NexusDB.get().subjects.forEach(sub => {
        select.innerHTML += `<option value="${sub.id}" style="color: black;">${sub.name}</option>`;
    });
}

// Modal Logic
function openAddModal() { 
    document.getElementById('modal-title').innerText = "Add New Assignment";
    document.getElementById('add-modal').style.display = 'flex'; 
    
    // Auto-select the subject if we are in Subject Mode
    if (currentSubjectId) {
        document.getElementById('task-subject').value = currentSubjectId;
    }
}

function closeAddModal() { 
    document.getElementById('add-modal').style.display = 'none'; 
    document.getElementById('task-title').value = ''; 
    document.getElementById('task-date').value = ''; 
    document.getElementById('task-subject').value = 'none';
    document.getElementById('edit-task-id').value = ''; 
}

function editAssignment(id) {
    const db = NexusDB.get();
    const task = db.assignments.find(a => a.id === id);
    if (!task) return;

    document.getElementById('modal-title').innerText = "Edit Assignment";
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-date').value = task.dueDate;
    document.getElementById('task-subject').value = task.subjectId;
    document.getElementById('edit-task-id').value = task.id;
    
    document.getElementById('add-modal').style.display = 'flex';
}

function saveAssignment() {
    const title = document.getElementById('task-title').value;
    const date = document.getElementById('task-date').value;
    const subj = document.getElementById('task-subject').value;
    const editId = document.getElementById('edit-task-id').value;

    if (!title || !date) return alert("Title and date required.");

    const db = NexusDB.get();

    if (editId) {
        // UPDATE
        const taskIndex = db.assignments.findIndex(a => a.id === editId);
        if (taskIndex > -1) {
            db.assignments[taskIndex].title = title;
            db.assignments[taskIndex].dueDate = date;
            db.assignments[taskIndex].subjectId = subj;
        }
    } else {
        // CREATE
        db.assignments.push({ 
            id: 'a_' + Date.now(), 
            title: title, 
            subjectId: subj, 
            dueDate: date 
        });
    }

    NexusDB.save(db);
    closeAddModal();
    renderAssignments();
}

function deleteAssignment(id) {
    const db = NexusDB.get();
    db.assignments = db.assignments.filter(a => a.id !== id);
    NexusDB.save(db);
    renderAssignments();
}