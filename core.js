// --- core.js ---

const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('nexus-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.bindToggle();

        // Release the CSS transition lock ONLY after the page has fully painted
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.documentElement.classList.remove('preload-theme');
            }, 100); // 100ms buffer guarantees the paint is finished
        });
    },
    bindToggle() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('nexus-theme', targetTheme);
        });
    }
};

const ResetManager = {
    init() {
        this.injectUI();
    },
    
    injectUI() {
        const topNav = document.querySelector('.top-nav');
        if (topNav) {
            const btnGroup = document.createElement('div');
            btnGroup.style.display = 'flex';
            btnGroup.style.gap = '10px';
            
            const themeBtn = document.getElementById('theme-toggle');
            if(themeBtn) {
                themeBtn.parentNode.insertBefore(btnGroup, themeBtn);
                btnGroup.appendChild(themeBtn);
            }

            const resetBtn = document.createElement('button');
            resetBtn.className = 'nexus-btn';
            resetBtn.style.borderColor = 'var(--danger)';
            resetBtn.style.color = 'var(--danger)';
            resetBtn.innerText = '⚠ Reset Data';
            resetBtn.onclick = () => this.openModal();
            btnGroup.appendChild(resetBtn);
        }

        const modalHTML = `
            <div id="global-reset-modal" class="modal-overlay">
                <div class="nexus-card" style="width: 450px; text-align: center;">
                    <h2 style="color: var(--danger); margin-top: 0;">Reset Progress</h2>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 25px;">
                        Clear your progress trackers. Your custom syllabus topics and resources will be kept safe.
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button class="nexus-btn" onclick="ResetManager.execute('syllabus')">1. Reset Only Syllabus Markings</button>
                        <button class="nexus-btn" onclick="ResetManager.execute('assignments')">2. Delete All Assignments</button>
                        <button class="nexus-btn" style="background: rgba(239, 68, 68, 0.1); border-color: var(--danger); color: var(--danger);" onclick="ResetManager.execute('both')">3. Reset Markings & Delete Assignments</button>
                    </div>
                    
                    <button class="nexus-btn accent-btn" style="margin-top: 25px; width: 100%;" onclick="ResetManager.closeModal()">Cancel</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    openModal() {
        document.getElementById('global-reset-modal').style.display = 'flex';
    },

    closeModal() {
        document.getElementById('global-reset-modal').style.display = 'none';
    },

    execute(type) {
        const db = NexusDB.get();
        
        if (type === 'syllabus') {
            if(!confirm("Reset all syllabus progress? Your custom topics will remain, but will be marked as 'Pending'.")) return;
            
            db.subjects.forEach(sub => {
                if(sub.syllabus) {
                    sub.syllabus.forEach(topic => topic.status = 'pending');
                }
            });
            NexusDB.save(db);
            alert("Syllabus markings successfully reset.");
        } 
        
        else if (type === 'assignments') {
            if(!confirm("Are you sure you want to permanently delete ALL assignments?")) return;
            
            db.assignments = [];
            NexusDB.save(db);
            alert("All assignments have been deleted.");
        } 
        
        else if (type === 'both') {
            if(!confirm("Clear all syllabus markings AND delete all assignments? Your custom topics, notes, and resources will remain intact.")) return;
            
            // 1. Reset Syllabus Markings
            db.subjects.forEach(sub => {
                if(sub.syllabus) {
                    sub.syllabus.forEach(topic => topic.status = 'pending');
                }
            });
            
            // 2. Clear Assignments
            db.assignments = [];
            
            NexusDB.save(db);
            alert("Progress cleared. Markings reset and assignments deleted.");
        }
        
        this.closeModal();
        window.location.reload(); 
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    ResetManager.init();
});