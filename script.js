/*
=========================================
  EduSphere - Premium Logic & Interactivity
  Theme management, slider, filter & components
=========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initMobileMenu();
  initSearch();
  initAboutTabs();
  initCourseFilter();
  initLiveClassCountdown();
  initScrollReveal();
  initCounters();
  initDashboardInteraction();
  initPracticeQuiz();
  initScholarshipModal();
  initTestimonialSlider();
  initFAQAccordion();
  initContactForm();
  initNewsletter();
  initBackToTop();
});

/* --- Loading Screen Handler --- */
function initLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('fade-out');
        // Remove from layout after fade animation finishes
        setTimeout(() => loader.remove(), 500);
      }, 600); // Small delay for visual impact
    });
  }
}

/* --- Theme Toggle & Persistence --- */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply stored theme on startup
  document.documentElement.setAttribute('data-theme', storedTheme);
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Dynamic micro-animation for theme toggle button
      toggleBtn.style.transform = 'scale(0.85) rotate(15deg)';
      setTimeout(() => {
        toggleBtn.style.transform = '';
      }, 150);
    });
  }
}

/* --- Mobile Navigation Drawer --- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerMenu');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside of menu structure
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }
}

/* --- Search Modal Overlay --- */
function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  
  if (searchBtn && searchModal && searchClose) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('active');
      searchInput.value = '';
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
        searchInput.value = '';
      }
    });

    // ESC Key triggers close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        searchModal.classList.remove('active');
        searchInput.value = '';
      }
    });
  }
}

/* --- About Tabs Slider --- */
function initAboutTabs() {
  const tabs = document.querySelectorAll('.about-tab-btn');
  const contents = document.querySelectorAll('.about-tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* --- Dynamic Course Filter System --- */
function initCourseFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          // Delay display change to match transitions
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --- Countdowns Scheduler --- */
function initLiveClassCountdown() {
  const countdownElements = document.querySelectorAll('[data-countdown]');
  
  function updateCountdowns() {
    const now = new Date().getTime();
    
    countdownElements.forEach(el => {
      const targetDateStr = el.getAttribute('data-countdown');
      const targetDate = new Date(targetDateStr).getTime();
      const diff = targetDate - now;
      
      if (diff <= 0) {
        // Class has started or is completed
        el.innerHTML = '<span style="color: var(--success); font-weight:700;">STARTED / LIVE NOW</span>';
        const badge = el.closest('.live-card')?.querySelector('.live-badge');
        if (badge) {
          badge.className = 'live-badge';
          badge.innerHTML = '<span></span> Live Now';
        }
        return;
      }
      
      // Calculate times
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Populate DOM elements
      const dBox = el.querySelector('.cd-days');
      const hBox = el.querySelector('.cd-hours');
      const mBox = el.querySelector('.cd-mins');
      const sBox = el.querySelector('.cd-secs');
      
      if (dBox && hBox && mBox && sBox) {
        dBox.textContent = String(days).padStart(2, '0');
        hBox.textContent = String(hours).padStart(2, '0');
        mBox.textContent = String(minutes).padStart(2, '0');
        sBox.textContent = String(seconds).padStart(2, '0');
      }
    });
  }
  
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}

/* --- Scroll-Reveal Logic --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve to keep active state
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
}

/* --- Count Up Counter System --- */
function initCounters() {
  const counters = document.querySelectorAll('.count-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds animation duration
        const stepTime = Math.max(Math.floor(duration / target), 10);
        let current = 0;
        
        const timer = setInterval(() => {
          current += Math.ceil(target / (duration / stepTime));
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          // Format numbers with comma grouping if they are large
          counter.textContent = current.toLocaleString() + (counter.getAttribute('data-suffix') || '');
        }, stepTime);
        
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(c => observer.observe(c));
}

/* --- Interactive Student Dashboard Mockup --- */
function initDashboardInteraction() {
  const checkboxes = document.querySelectorAll('.assignment-check');
  const completedText = document.getElementById('completedTasksCount');
  const totalText = document.getElementById('totalTasksCount');
  const dashboardProgress = document.getElementById('dashboardProgressBar');
  const streakDays = document.getElementById('streakDays');
  const streakText = document.getElementById('streakMsg');
  
  if (checkboxes.length > 0 && dashboardProgress) {
    // Total count update
    if (totalText) totalText.textContent = checkboxes.length;
    
    function updateProgress() {
      const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
      if (completedText) completedText.textContent = checkedCount;
      
      const percentage = (checkedCount / checkboxes.length) * 100;
      dashboardProgress.style.width = `${percentage}%`;
      
      // Circular progress bar emulation update (for widgets)
      const ring = document.querySelector('.db-stat-circle');
      if (ring) {
        ring.style.setProperty('--progress', `${percentage}%`);
        ring.querySelector('.ring-val').textContent = `${Math.round(percentage)}%`;
      }
    }
    
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        // Smoothly cross off item text
        const label = cb.closest('li')?.querySelector('span');
        if (label) {
          if (cb.checked) {
            label.style.textDecoration = 'line-through';
            label.style.opacity = '0.5';
          } else {
            label.style.textDecoration = 'none';
            label.style.opacity = '1';
          }
        }
        updateProgress();
      });
    });

    // Simulate streak hover action
    const streakCard = document.querySelector('.streak-card');
    if (streakCard && streakDays) {
      streakCard.addEventListener('mouseenter', () => {
        let currentStreak = parseInt(streakDays.textContent, 10);
        if (currentStreak < 16) {
          streakDays.textContent = currentStreak + 1;
          streakDays.style.color = 'var(--pink)';
          if (streakText) streakText.textContent = 'Learning Flame Unlocked!';
        }
      });
    }

    updateProgress();
  }
}

/* --- Practice Quiz Challenge --- */
function initPracticeQuiz() {
  const quizQuestions = [
    {
      question: "Which data structure operates on a 'First-In, First-Out' (FIFO) process?",
      options: ["Stack", "Queue", "Binary Tree", "HashMap"],
      answer: 1
    },
    {
      question: "What is the primary function of DNA inside cell nuclei?",
      options: ["Storing genetic codes", "Synthesizing lipids", "Releasing cellular oxygen", "Filtering waste"],
      answer: 0
    },
    {
      question: "Which trigonometric function is defined as opposite side divided by hypotenuse?",
      options: ["Cosine", "Tangent", "Sine", "Secant"],
      answer: 2
    }
  ];

  let currentQuestionIdx = 0;
  let score = 0;
  let selected = false;

  const quizQuestionNum = document.getElementById('quizQuestionNum');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizScoreText = document.getElementById('quizScoreVal');
  const quizNextBtn = document.getElementById('quizNextBtn');

  function renderQuestion() {
    if (!quizQuestion || !quizOptions) return;
    
    selected = false;
    if (quizNextBtn) quizNextBtn.style.display = 'none';
    
    const qData = quizQuestions[currentQuestionIdx];
    
    // Set text details
    if (quizQuestionNum) quizQuestionNum.textContent = `Question ${currentQuestionIdx + 1}/${quizQuestions.length}`;
    quizQuestion.textContent = qData.question;
    
    // Empty options container
    quizOptions.innerHTML = '';
    
    // Populate options
    qData.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span>${opt}</span><i class="far fa-circle"></i>`;
      
      btn.addEventListener('click', () => {
        if (selected) return;
        selected = true;
        
        const isCorrect = idx === qData.answer;
        if (isCorrect) {
          btn.classList.add('correct');
          btn.querySelector('i').className = 'fas fa-check-circle';
          score += 10;
          if (quizScoreText) quizScoreText.textContent = score;
        } else {
          btn.classList.add('wrong');
          btn.querySelector('i').className = 'fas fa-times-circle';
          
          // Display the correct one visually
          const correctBtn = quizOptions.children[qData.answer];
          if (correctBtn) {
            correctBtn.classList.add('correct');
            correctBtn.querySelector('i').className = 'fas fa-check-circle';
          }
        }
        
        // Show next button
        if (quizNextBtn) quizNextBtn.style.display = 'inline-flex';
      });
      
      quizOptions.appendChild(btn);
    });
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      currentQuestionIdx++;
      if (currentQuestionIdx < quizQuestions.length) {
        renderQuestion();
      } else {
        // Quiz completed
        if (quizQuestionNum) quizQuestionNum.textContent = 'Quiz Completed';
        if (quizQuestion) quizQuestion.textContent = `Fantastic! You scored ${score} points!`;
        if (quizOptions) quizOptions.innerHTML = '';
        quizNextBtn.textContent = 'Restart Challenge';
        quizNextBtn.querySelector('i').className = 'fas fa-redo';
        currentQuestionIdx = -1; // Reset trigger
        score = 0;
      }
    });
  }

  // Handle first load of quiz
  if (quizQuestion) {
    renderQuestion();
  }
}

/* --- Scholarship Modal Trigger --- */
function initScholarshipModal() {
  const schModal = document.getElementById('scholarshipModal');
  const modalClose = document.getElementById('schModalClose');
  const applyBtns = document.querySelectorAll('.apply-sch-btn');
  const schForm = document.getElementById('scholarshipForm');
  const schFeedback = document.getElementById('schFormFeedback');
  const schTitleInput = document.getElementById('schTitleInput');
  
  if (schModal && modalClose) {
    applyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const schCard = btn.closest('.glass-card');
        const schName = schCard ? schCard.querySelector('h3').textContent : 'General Scholarship';
        
        if (schTitleInput) schTitleInput.value = schName;
        schModal.classList.add('active');
        if (schFeedback) schFeedback.style.display = 'none';
      });
    });

    modalClose.addEventListener('click', () => {
      schModal.classList.remove('active');
      if (schForm) schForm.reset();
    });

    schModal.addEventListener('click', (e) => {
      if (e.target === schModal) {
        schModal.classList.remove('active');
        if (schForm) schForm.reset();
      }
    });

    if (schForm) {
      schForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('schName').value.trim();
        const email = document.getElementById('schEmail').value.trim();
        
        if (!name || !email) {
          showFeedback(schFeedback, 'Please fill in all fields.', 'error');
          return;
        }
        
        // Simulating API loading & success
        const submitBtn = schForm.querySelector('button[type="submit"]');
        const origText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Application...';
        
        setTimeout(() => {
          showFeedback(schFeedback, 'Application submitted successfully! Check your email.', 'success');
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
          schForm.reset();
          
          // Close modal after success
          setTimeout(() => {
            schModal.classList.remove('active');
          }, 2000);
        }, 1500);
      });
    }
  }
}

/* --- Testimonial Slider Carousel --- */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('sliderDots');
  
  if (track && slides.length > 0 && dotsContainer) {
    let currentIdx = 0;
    let autoPlayTimer;
    
    // Create navigation dots dynamically based on number of slides
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function goToSlide(idx) {
      currentIdx = idx;
      track.style.transform = `translateX(-${currentIdx * 100}%)`;
      
      // Update dot active states
      dots.forEach(d => d.classList.remove('active'));
      if (dots[currentIdx]) {
        dots[currentIdx].classList.add('active');
      }
    }
    
    function nextSlide() {
      currentIdx = (currentIdx + 1) % slides.length;
      goToSlide(currentIdx);
    }
    
    function startAutoPlay() {
      autoPlayTimer = setInterval(nextSlide, 5000); // Transitions every 5 seconds
    }
    
    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    }
    
    startAutoPlay();
    
    // Handle Window resize to re-align offset
    window.addEventListener('resize', () => {
      goToSlide(currentIdx);
    });
  }
}

/* --- Accordion FAQ System --- */
function initFAQAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const faqItem = header.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close other accordion panels
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-body').style.maxHeight = null;
      });
      
      if (!isActive) {
        faqItem.classList.add('active');
        const body = faqItem.querySelector('.faq-body');
        // Set height explicitly to animate smoothly
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* --- Interactive Contact Form Validation --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFeedback');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const msg = document.getElementById('contactMessage').value.trim();
      
      if (!name || !email || !subject || !msg) {
        showFeedback(feedback, 'Please fill in all inputs.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showFeedback(feedback, 'Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission API
      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message <i class="fas fa-spinner fa-spin"></i>';
      
      setTimeout(() => {
        showFeedback(feedback, 'Message sent successfully! We will contact you soon.', 'success');
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        form.reset();
      }, 1500);
    });
  }
}

/* --- Newsletter Submission Handling --- */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('.newsletter-input').value.trim();
      
      if (!email || !validateEmail(email)) {
        alert('Please provide a valid email address.');
        return;
      }
      
      const btn = form.querySelector('.newsletter-btn');
      const origText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Subscribed!';
      
      setTimeout(() => {
        alert('Thank you for subscribing to our newsletter!');
        btn.disabled = false;
        btn.textContent = origText;
        form.reset();
      }, 1000);
    });
  }
}

/* --- Back To Top Scroll Control --- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  
  if (btn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
    
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --- Helper Utilities --- */
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

function showFeedback(element, text, type) {
  if (!element) return;
  
  element.textContent = text;
  element.className = `form-feedback ${type}`;
  element.style.display = 'block';
  
  // Highlight animation
  element.style.animation = 'none';
  // Trigger reflow
  element.offsetHeight;
  element.style.animation = 'scale-up-down 0.4s ease';
}
