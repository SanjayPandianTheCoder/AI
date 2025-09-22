// Mobile-First Birthday Story App for Aarthi Iswarya
// Fixed story progression and interaction issues

class BirthdayStoryApp {
    constructor() {
        this.currentSegment = 0;
        this.storySegments = [
            'greeting',
            'compliment', 
            'birthday_recognition',
            'initial_plan',
            'pause',
            'realization',
            'reason',
            'so',
            'big_reveal',
            'character_section',
            'balloon_section',
            'book_section',
            'closing_section'
        ];
        this.currentPage = 1;
        this.totalPages = 15;
        this.bookOpen = false;
        this.particleCount = 15;

        this.balloonMessages = [
            "🎉 Hope your day is as wonderful as you are!",
            "✨ May all your dreams come true this year!",
            "🌟 Another year of amazing adventures awaits!",
            "🎊 Celebrate and make beautiful memories!",
            "💖 You're absolutely amazing, Aarthi!",
            "🎈 Wishing you endless joy and happiness!",
            "🌈 May your year be filled with magic!",
            "🎁 Here's to another fantastic year!"
        ];

        this.characterMessages = {
            'Jackie Chan Adventures': '🥋 Adventure awaits on your birthday!',
            'Tom and Jerry': '🐱🐭 Classic fun for your special day!',
            'Horrid Henry': '😈 Mischievous birthday wishes!',
            'Doraemon': '🤖 Magical gadgets for your birthday!',
            'Ninja Hattori': '🥷 Ninja protection for your joy!',
            'Creep School': '👻 Spooky birthday fun!'
        };

        this.init();
    }

    init() {
        console.log('🎂 Mobile Birthday Story Loading for Aarthi Iswarya...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApp();
            });
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        this.createParticles();
        this.setupEventListeners();
        this.startStory();
        
        console.log('🎉 Mobile Birthday Story Ready!');
        console.log('Current segment:', this.currentSegment, 'of', this.storySegments.length);
    }

    setupEventListeners() {
        // Fixed continue button handling with more robust event delegation
        document.addEventListener('click', (e) => {
            console.log('Click detected on:', e.target.className, e.target.tagName);
            
            // Check if clicked element or its parent is a continue button
            let target = e.target;
            while (target && target !== document) {
                if (target.classList && target.classList.contains('continue-btn')) {
                    console.log('Continue button clicked! Current segment:', this.currentSegment);
                    e.preventDefault();
                    e.stopPropagation();
                    this.nextSegment();
                    return;
                }
                target = target.parentElement;
            }
        });

        // Handle specific button clicks
        document.addEventListener('click', (e) => {
            if (e.target.id === 'replayBtn') {
                e.preventDefault();
                this.restartStory();
            } else if (e.target.id === 'shareBtn') {
                e.preventDefault();
                this.shareStory();
            }
        });

        // Balloon interactions
        this.setupBalloonInteractions();

        // Character interactions
        this.setupCharacterInteractions();

        // Book interactions
        this.setupBookInteractions();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        this.setupTouchGestures();
    }

    setupBalloonInteractions() {
        const balloonItems = document.querySelectorAll('.balloon-item');
        console.log('Setting up', balloonItems.length, 'balloon interactions');
        
        balloonItems.forEach((balloonItem, index) => {
            const balloon = balloonItem.querySelector('.balloon');
            const messageDiv = balloonItem.querySelector('.balloon-message');
            
            const handleBalloonClick = (e) => {
                console.log('Balloon clicked:', index);
                e.preventDefault();
                e.stopPropagation();
                this.popBalloon(balloonItem, balloon, messageDiv, index);
            };
            
            balloonItem.addEventListener('click', handleBalloonClick);
            balloonItem.addEventListener('touchstart', handleBalloonClick, { passive: false });
        });
    }

    setupCharacterInteractions() {
        const characterCards = document.querySelectorAll('.character-card');
        console.log('Setting up', characterCards.length, 'character interactions');
        
        characterCards.forEach(card => {
            const messageDiv = card.querySelector('.character-message');
            
            const handleCharacterClick = (e) => {
                const character = card.getAttribute('data-character');
                console.log('Character clicked:', character);
                e.preventDefault();
                e.stopPropagation();
                this.showCharacterMessage(card, messageDiv);
            };
            
            card.addEventListener('click', handleCharacterClick);
            card.addEventListener('touchstart', handleCharacterClick, { passive: false });
        });
    }

    setupBookInteractions() {
        // Open book button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('open-book-btn')) {
                e.preventDefault();
                console.log('Open book button clicked');
                this.openBook();
            }
        });

        // Book control buttons
        const closeBookBtn = document.getElementById('closeBookBtn');
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');
        
        if (closeBookBtn) {
            closeBookBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeBook();
            });
        }
        
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.previousPage();
            });
        }
        
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextPage();
            });
        }

        this.updateBookNavigation();
    }

    createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            container.appendChild(particle);
        }

        setInterval(() => {
            this.addSingleParticle();
        }, 2000);
    }

    addSingleParticle() {
        const container = document.getElementById('particles');
        if (!container || container.children.length > this.particleCount * 2) return;

        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }

    startStory() {
        console.log('Starting story at segment 0');
        this.showSegment(0);
        this.updateProgress();
    }

    showSegment(index) {
        console.log('Attempting to show segment:', index, '(' + this.storySegments[index] + ')');
        
        if (index < 0 || index >= this.storySegments.length) {
            console.error('Invalid segment index:', index);
            return;
        }

        // Hide all segments first
        const allSegments = document.querySelectorAll('.story-segment, .interactive-section');
        console.log('Found', allSegments.length, 'total segments to hide');
        
        allSegments.forEach((segment, i) => {
            segment.classList.remove('active');
            segment.classList.add('hidden');
            console.log('Hid segment:', segment.id);
        });

        // Show target segment
        const targetId = this.storySegments[index];
        const targetSegment = document.getElementById(targetId);
        
        if (!targetSegment) {
            console.error('Target segment not found:', targetId);
            return;
        }

        console.log('Showing segment:', targetId);
        targetSegment.classList.remove('hidden');
        
        // Add slight delay for smooth transition
        setTimeout(() => {
            targetSegment.classList.add('active');
            console.log('Segment activated:', targetId);
        }, 50);
        
        // Animate text elements
        setTimeout(() => {
            this.animateTextElements(targetSegment);
        }, 200);
        
        // Special effects for celebration
        if (targetId === 'big_reveal') {
            setTimeout(() => {
                this.createCelebrationEffect();
            }, 1000);
        }
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        this.currentSegment = index;
        this.updateProgress();
        
        console.log('Successfully showed segment:', index, 'Current segment now:', this.currentSegment);
    }

    nextSegment() {
        console.log('Next segment requested. Current:', this.currentSegment, 'Max:', this.storySegments.length - 1);
        
        if (this.currentSegment < this.storySegments.length - 1) {
            const nextIndex = this.currentSegment + 1;
            console.log('Moving to segment:', nextIndex);
            this.showSegment(nextIndex);
        } else {
            console.log('Story completed!');
            this.completeStory();
        }
    }

    previousSegment() {
        if (this.currentSegment > 0) {
            this.showSegment(this.currentSegment - 1);
        }
    }

    animateTextElements(container = null) {
        const target = container || document;
        const textElements = target.querySelectorAll('.story-text');
        
        textElements.forEach((element, index) => {
            element.style.animationDelay = (index * 0.3) + 's';
            element.classList.add('animate');
        });
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            const progress = ((this.currentSegment + 1) / this.storySegments.length) * 100;
            progressFill.style.width = progress + '%';
            console.log('Progress updated:', progress + '%');
        }
    }

    completeStory() {
        console.log('🎊 Story completed! Happy Birthday Aarthi Iswarya!');
        this.createGrandCelebration();
    }

    restartStory() {
        console.log('🔄 Restarting story...');
        this.currentSegment = 0;
        this.closeBook();
        this.resetAllInteractions();
        this.startStory();
    }

    resetAllInteractions() {
        // Reset balloons
        const balloons = document.querySelectorAll('.balloon');
        const balloonMessages = document.querySelectorAll('.balloon-message');
        balloons.forEach(balloon => balloon.classList.remove('popped'));
        balloonMessages.forEach(msg => msg.classList.add('hidden'));

        // Reset character messages
        const characterMessages = document.querySelectorAll('.character-message');
        characterMessages.forEach(msg => msg.classList.add('hidden'));
    }

    // Balloon interactions with inline messages
    popBalloon(balloonElement, balloon, messageDiv, index) {
        const message = this.balloonMessages[index] || balloonElement.getAttribute('data-message');
        
        console.log('Popping balloon:', index, 'Message:', message);
        
        if (balloon && !balloon.classList.contains('popped') && messageDiv) {
            // Pop animation
            balloon.classList.add('popped');
            
            // Show inline message
            messageDiv.textContent = message;
            messageDiv.classList.remove('hidden');
            
            // Create pop effect
            this.createPopEffect(balloonElement);
            
            // Reset after delay
            setTimeout(() => {
                balloon.classList.remove('popped');
                messageDiv.classList.add('hidden');
            }, 4000);
            
            // Haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }
    }

    createPopEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1001';
            
            const colors = ['#FF69B4', '#87CEEB', '#FFD700', '#98FB98'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * i) / 8;
            const distance = Math.random() * 60 + 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - centerX - 2}px, ${endY - centerY - 2}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
            
            document.body.appendChild(particle);
        }
    }

    // Character interactions with inline messages
    showCharacterMessage(card, messageDiv) {
        const character = card.getAttribute('data-character');
        const message = this.characterMessages[character];
        
        console.log('Showing character message for:', character);
        
        if (message && messageDiv) {
            // Show inline message
            messageDiv.textContent = message;
            messageDiv.classList.remove('hidden');
            
            // Animate character
            this.animateCharacter(card);
            
            // Hide message after delay
            setTimeout(() => {
                messageDiv.classList.add('hidden');
            }, 4000);
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
    }

    animateCharacter(card) {
        const icon = card.querySelector('.character-icon');
        if (icon) {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'character-float 0.6s ease-in-out';
            }, 10);
        }
        
        card.style.transform = 'translateY(-8px) scale(1.02)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);
    }

    // Book interactions
    openBook() {
        console.log('📖 Opening book...');
        
        const bookCover = document.getElementById('bookCover');
        const bookPages = document.getElementById('bookPages');
        const bookControls = document.getElementById('bookControls');
        
        if (bookCover && bookPages && bookControls) {
            bookCover.classList.add('open');
            bookPages.classList.remove('hidden');
            bookControls.classList.remove('hidden');
            
            this.bookOpen = true;
            this.currentPage = 1;
            this.showPage(1);
            this.updateBookNavigation();
            
            setTimeout(() => {
                this.createSparkleEffect();
            }, 300);
            
            if (navigator.vibrate) {
                navigator.vibrate([50, 50, 100]);
            }
        }
    }

    closeBook() {
        const bookCover = document.getElementById('bookCover');
        const bookPages = document.getElementById('bookPages');
        const bookControls = document.getElementById('bookControls');
        
        if (bookCover && bookPages && bookControls) {
            bookCover.classList.remove('open');
            
            setTimeout(() => {
                bookPages.classList.add('hidden');
                bookControls.classList.add('hidden');
                this.bookOpen = false;
            }, 800);
        }
    }

    showPage(pageNumber) {
        const pages = document.querySelectorAll('.page');
        const pageIndicator = document.getElementById('pageIndicator');
        
        pages.forEach(page => page.classList.remove('active'));
        
        const targetPage = document.querySelector(`[data-page="${pageNumber}"]`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageNumber;
            
            if (pageIndicator) {
                pageIndicator.textContent = `${pageNumber} / ${this.totalPages}`;
            }
            
            this.updateBookNavigation();
            this.addPageTurnEffect();
            
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.showPage(this.currentPage + 1);
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    }

    updateBookNavigation() {
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
            prevBtn.style.opacity = this.currentPage === 1 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === this.totalPages;
            nextBtn.style.opacity = this.currentPage === this.totalPages ? '0.5' : '1';
        }
    }

    addPageTurnEffect() {
        const book = document.querySelector('.book');
        if (book) {
            book.style.transform = 'rotateY(3deg)';
            book.style.transition = 'transform 0.2s ease';
            setTimeout(() => {
                book.style.transform = 'rotateY(0deg)';
            }, 200);
        }
    }

    // Effects and animations
    createCelebrationEffect() {
        console.log('🎉 Creating celebration effect!');
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createFirework();
            }, i * 150);
        }
        
        this.createConfettiShower();
    }

    createGrandCelebration() {
        console.log('🎊 Grand celebration!');
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createCelebrationEffect();
            }, i * 1500);
        }
    }

    createFirework() {
        const colors = ['#FF69B4', '#87CEEB', '#FFD700', '#98FB98', '#FFA500'];
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.5) + window.innerHeight * 0.1;
        
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.style.position = 'fixed';
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            spark.style.width = '3px';
            spark.style.height = '3px';
            spark.style.borderRadius = '50%';
            spark.style.background = colors[Math.floor(Math.random() * colors.length)];
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '999';
            
            const angle = (Math.PI * 2 * i) / 8;
            const distance = Math.random() * 80 + 40;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            spark.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(${endX - x - 1.5}px, ${endY - y - 1.5}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                if (spark.parentNode) {
                    spark.parentNode.removeChild(spark);
                }
            };
            
            document.body.appendChild(spark);
        }
    }

    createConfettiShower() {
        const colors = ['#FF69B4', '#87CEEB', '#FFD700', '#98FB98'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.width = '6px';
                confetti.style.height = '6px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '998';
                
                confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 20}px) rotate(360deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 2000 + 1500,
                    easing: 'linear'
                }).onfinish = () => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                };
                
                document.body.appendChild(confetti);
            }, i * 100);
        }
    }

    createSparkleEffect() {
        const book = document.querySelector('.book');
        if (!book) return;

        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#FFD700';
            sparkle.style.borderRadius = '50%';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '50';
            
            sparkle.animate([
                { opacity: 0, transform: 'scale(0)' },
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: 1200,
                easing: 'ease-in-out'
            }).onfinish = () => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            };
            
            book.appendChild(sparkle);
        }
    }

    // Input handling
    handleKeyboard(event) {
        switch (event.key) {
            case ' ':
            case 'Enter':
                event.preventDefault();
                if (!this.bookOpen) {
                    this.nextSegment();
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (this.bookOpen) {
                    this.nextPage();
                } else {
                    this.nextSegment();
                }
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (this.bookOpen) {
                    this.previousPage();
                } else {
                    this.previousSegment();
                }
                break;
            case 'Escape':
                event.preventDefault();
                if (this.bookOpen) {
                    this.closeBook();
                }
                break;
            case 'r':
            case 'R':
                event.preventDefault();
                this.restartStory();
                break;
        }
    }

    setupTouchGestures() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 80) {
                if (this.bookOpen) {
                    if (deltaX > 0) {
                        this.previousPage();
                    } else {
                        this.nextPage();
                    }
                }
            }
        }, { passive: true });
    }

    shareStory() {
        const shareData = {
            title: 'Happy Birthday Aarthi Iswarya!',
            text: '🎉 Check out this magical mobile birthday story created for Aarthi Iswarya!',
            url: window.location.href
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData)
                .then(() => console.log('📱 Story shared successfully!'))
                .catch(err => {
                    console.log('📱 Share error:', err);
                    this.fallbackShare();
                });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        const text = '🎉 Happy Birthday Aarthi Iswarya! Check out this mobile birthday story! ' + window.location.href;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    this.showToast('🔗 Link copied! Share the birthday joy!');
                })
                .catch(() => {
                    this.legacyCopyText(text);
                });
        } else {
            this.legacyCopyText(text);
        }
    }

    legacyCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showToast('🔗 Link copied! Share the birthday joy!');
        } catch (err) {
            console.log('Copy failed:', err);
            this.showToast('📱 Unable to copy link automatically');
        }
        
        document.body.removeChild(textArea);
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-surface);
            color: var(--color-text);
            padding: 12px 20px;
            border-radius: 25px;
            border: 2px solid var(--color-primary);
            font-size: 14px;
            z-index: 10000;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 80vw;
            text-align: center;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app
let birthdayApp;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        birthdayApp = new BirthdayStoryApp();
    });
} else {
    birthdayApp = new BirthdayStoryApp();
}

// Birthday message
const today = new Date();
const birthday = new Date(today.getFullYear(), 8, 23);

if (today.getMonth() === 8 && today.getDate() === 23) {
    console.log(`
🎂📱 IT'S AARTHI'S BIRTHDAY TODAY! 📱🎂
Perfect mobile experience ready for celebration! 🎉
    `);
} else {
    if (birthday < today) {
        birthday.setFullYear(today.getFullYear() + 1);
    }
    const timeDiff = birthday.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    console.log(`
📱🗓️ ${daysDiff} days until Aarthi's birthday! 🎂
Mobile-ready celebration awaiting September 23rd! 🌟
    `);
}