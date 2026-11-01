/* Offline PoC only. No network calls, real authentication or password storage. */
(() => {
  "use strict";
  const DATA = window.POC_DATA;
  const KEY = "yourin-poc-v2";
  const PREFIX = "yourin-poc:";
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const page = document.body.dataset.page;
  const jobKeys = ["job-title", "domain", "company", "position", "job-url"];
  const strings = (value, length) => Array.isArray(value) && value.length === length && value.every(item => typeof item === "string");
  const identity = name => name.trim().toLocaleLowerCase();
  const go = url => { window.location.href = url; };

  function newAccount(username) {
    return {
      username,
      password: "123",
      cv: [...DATA.cv],
      job: {},
      syncCV: true,
      activeId: null,
      feedback: [],
      cvMode: "text",
      cvPdf: null,
      interviews: [1, 2, 3, 4].map(n => ({
        id: "sample-" + n, name: "Interview " + n, date: "29/2/2026",
        finished: n !== 2, sample: true,
        answers: n === 2 ? ["", "", ""] : [...DATA.answers],
        cv: [...DATA.cv], job: {}
      }))
    };
  }
  // Ignore corrupt or incompatible demo state instead of breaking the presentation.
  function validState(value) {
    return value && value.version === 2 && Number.isFinite(value.updatedAt) &&
      typeof value.currentAccount === "string" && Array.isArray(value.accounts) &&
      value.accounts.length > 0 && value.accounts.every(account =>
        account && typeof account.username === "string" && account.username.trim() &&
        strings(account.cv, 4) && account.job && typeof account.job === "object" &&
        Array.isArray(account.feedback) && Array.isArray(account.interviews) &&
        account.interviews.every(interview =>
          interview && typeof interview.id === "string" && typeof interview.name === "string" &&
          typeof interview.date === "string" && strings(interview.answers, 3) &&
          (interview.cv === null || strings(interview.cv, 4))));
  }
  let state = {
    version: 2, updatedAt: 0, currentAccount: "Eric Arthur Blair",
    accounts: [newAccount("Eric Arthur Blair")]
  };
  const candidates = [];
  try { candidates.push(JSON.parse(localStorage.getItem(KEY))); } catch (_) { /* Storage may be disabled. */ }
  try {
    if (window.name.startsWith(PREFIX)) candidates.push(JSON.parse(window.name.slice(PREFIX.length)));
  } catch (_) { /* Ignore unrelated window names. */ }
  for (const candidate of candidates) {
    if (validState(candidate) && candidate.updatedAt >= state.updatedAt) state = candidate;
  }
  let account = state.accounts.find(item => identity(item.username) === identity(state.currentAccount)) || state.accounts[0];
  state.currentAccount = account.username;

  // Fallback defaults for demo account extensions
  if (!account.password) account.password = "123";
  if (!account.cvMode) account.cvMode = "text";

  function save() {
    state.updatedAt = Date.now();
    const serialized = JSON.stringify(state);
    try { localStorage.setItem(KEY, serialized); } catch (_) { /* Same-tab fallback below. */ }
    try { window.name = PREFIX + serialized; } catch (_) { /* Static navigation still works. */ }
  }
  function error(selector, message) {
    const element = $(selector);
    if (!element) return;
    element.textContent = message;
    element.hidden = false;
  }
  function activeInterview() {
    return account.interviews.find(item => item.id === account.activeId);
  }
  function reportInterview() {
    return activeInterview() || account.interviews.find(item => item.finished) || account.interviews[0];
  }
  function startInterview(customCV, customPdf) {
    const id = "interview-" + Date.now();
    let interviewCV = ["", "", "", ""];
    let interviewPdfItem = null;
    let mode = "text";

    if (customPdf) {
      interviewPdfItem = { ...customPdf };
      mode = "pdf";
    } else if (customCV && customCV.some(text => text && text.trim())) {
      interviewCV = [...customCV];
      mode = "text";
    } else if (account.syncCV) {
      if (account.cvPdf || account.cvMode === "pdf") {
        interviewPdfItem = account.cvPdf ? { ...account.cvPdf } : null;
        mode = "pdf";
      } else {
        interviewCV = [...account.cv];
        mode = "text";
      }
    }

    const item = {
      id,
      name: "New Interview " + (account.interviews.length + 1),
      date: new Date().toLocaleDateString("en-GB"),
      finished: false,
      answers: ["", "", ""],
      cv: interviewCV,
      cvPdf: interviewPdfItem,
      cvMode: mode,
      job: { ...account.job }
    };
    account.interviews.unshift(item);
    account.activeId = id;
    save();
    return item;
  }
  function saveJob() {
    account.job = Object.fromEntries(jobKeys.map(key => [key, $("#" + key).value.trim()]));
    account.syncCV = $("#sync-cv").checked;
    save();
  }
  function saveCV() {
    account.cv = $$("[data-cv]").map(input => input.value);
    save();
  }
  function saveAnswer() {
    const input = $("[data-answer]");
    if (!input) return;
    const interview = activeInterview() || startInterview();
    interview.answers[Number(input.dataset.answer)] = input.value;
    save();
  }

  $$("[data-username]").forEach(element => { element.textContent = account.username; });

  const navMap = {
    "dashboard": "dashboard",
    "storage": "storage",
    "system-feedback": "feedback",
    "profile": "profile"
  };
  const activeNav = navMap[page];
  if (activeNav) {
    const activeLink = $(`[data-nav="${activeNav}"]`);
    if (activeLink) activeLink.classList.add("is-active");
  }

  $$("[data-sign-out]").forEach(link => link.addEventListener("click", () => {
    state.currentAccount = "";
    save();
  }));

  const authForm = $("#auth-form");
  if (authForm) {
    authForm.addEventListener("submit", event => {
      event.preventDefault();
      const username = $("#username").value.trim();
      if (!username) return error("#auth-error", "Enter a username to continue.");
      if (page === "sign-up" && $("#password").value !== $("#confirm-password").value) {
        return error("#auth-error", "Passwords do not match.");
      }
      const existing = state.accounts.find(item => identity(item.username) === identity(username));
      if (page === "sign-up" && existing) {
        return error("#auth-error", "This demo username already exists. Please sign in.");
      }
      account = existing || newAccount(username);
      if (!existing) state.accounts.push(account);
      state.currentAccount = account.username;
      save();
      go("dashboard.html");
    });
  }

  $$("[data-new-interview]").forEach(link => link.addEventListener("click", () => {
    account.activeId = null;
    save();
  }));

  if (page === "profile") {
    const usernameInput = $("#profile-username");
    const passwordInput = $("#account-password");
    const verifyPasswordInput = $("#verify-password");
    const unlockBtn = $("#unlock-password-btn");
    const passwordUnlockBox = $("#password-unlock-box");
    const profileStatus = $("#profile-status");
    const profileError = $("#profile-error");

    let isPasswordUnlocked = false;

    // Prefill username and account password
    usernameInput.value = account.username;
    passwordInput.value = account.password || "123";

    // Unlock password verification
    unlockBtn.addEventListener("click", () => {
      const entered = verifyPasswordInput.value.trim();
      const currentPassword = account.password || "123";
      if (!entered) {
        error("#profile-error", "Enter current password to unlock.");
        verifyPasswordInput.focus();
        return;
      }
      if (entered !== currentPassword) {
        error("#profile-error", "Incorrect password. Please try again.");
        verifyPasswordInput.focus();
        return;
      }

      // Success: unlock password view & edit
      profileError.hidden = true;
      isPasswordUnlocked = true;
      passwordInput.type = "text";
      passwordInput.readOnly = false;
      passwordUnlockBox.classList.add("is-unlocked");
      passwordUnlockBox.innerHTML = `<p class="unlock-hint" style="color: #245b65; font-weight: 600; margin: 0;">✓ Password unlocked — you can now view and edit your password above.</p>`;
      profileStatus.textContent = "Password unlocked. You can now edit your credentials.";
      passwordInput.focus();
    });

    // Save profile (Username + Password)
    $("#profile-form").addEventListener("submit", event => {
      event.preventDefault();
      profileError.hidden = true;
      const newUsername = usernameInput.value.trim();
      if (!newUsername) return error("#profile-error", "Enter a username.");

      if (state.accounts.some(item => item !== account && identity(item.username) === identity(newUsername))) {
        return error("#profile-error", "That demo username is already in use.");
      }

      account.username = newUsername;
      state.currentAccount = newUsername;

      if (isPasswordUnlocked) {
        const newPassword = passwordInput.value.trim();
        if (newPassword) {
          account.password = newPassword;
        }
        // Lock password back
        passwordInput.type = "password";
        passwordInput.readOnly = true;
        isPasswordUnlocked = false;
      }

      save();
      $$("[data-username]").forEach(el => { el.textContent = account.username; });
      profileStatus.textContent = "Account information saved.";
    });

    // CV Section Management
    const cvStatus = $("#cv-status");
    const pdfStatus = $("#pdf-status");
    const pdfError = $("#pdf-error");

    const cvDropzone = $("#cv-pdf-dropzone");
    const cvFileInput = $("#cv-pdf-file-input");
    const cvPdfCard = $("#cv-pdf-card");
    const pdfFileName = $("#pdf-file-name");
    const pdfFileSize = $("#pdf-file-size");
    const pdfFileDate = $("#pdf-file-date");

    // Helper to clear 4 CV text sections when user chooses PDF input
    function clearCvSections() {
      $$("[data-cv]").forEach(textarea => { textarea.value = ""; });
      account.cv = ["", "", "", ""];
      account.cvMode = "pdf";
      save();
      if (cvStatus) cvStatus.textContent = "";
    }

    // Helper to clear PDF when user types in 4 CV text sections
    function clearPdfFile() {
      if (account.cvPdf) {
        account.cvPdf = null;
        account.cvMode = "text";
        if (cvFileInput) cvFileInput.value = "";
        renderPdfState();
        if (pdfStatus) pdfStatus.textContent = "";
        save();
      }
    }

    // Populate 4 CV Textareas (cleared if account has active PDF CV)
    const isPdfActive = Boolean(account.cvPdf || account.cvMode === "pdf");
    $$("[data-cv]").forEach((textarea, index) => {
      textarea.value = isPdfActive ? "" : (account.cv[index] || "");
      textarea.addEventListener("input", () => {
        clearPdfFile();
        saveCV();
        cvStatus.textContent = "Changes saved.";
      });
    });

    $("#save-cv-btn").addEventListener("click", () => {
      clearPdfFile();
      saveCV();
      cvStatus.textContent = "CV saved successfully.";
    });

    // Render PDF Card State
    function renderPdfState() {
      if (account.cvPdf) {
        cvDropzone.classList.add("is-hidden");
        cvPdfCard.classList.remove("is-hidden");
        pdfFileName.textContent = account.cvPdf.name;
        pdfFileSize.textContent = account.cvPdf.size;
        pdfFileDate.textContent = "Uploaded " + (account.cvPdf.date || "recently");
      } else {
        cvDropzone.classList.remove("is-hidden");
        cvPdfCard.classList.add("is-hidden");
      }
    }

    renderPdfState();

    // PDF Upload handling
    function handlePdfFile(file) {
      pdfError.hidden = true;
      if (!file) return;
      if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
        error("#pdf-error", "Please upload a valid PDF file (.pdf).");
        return;
      }
      clearCvSections();
      const sizeStr = file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
        : Math.round(file.size / 1024) + " KB";

      account.cvPdf = {
        name: file.name,
        size: sizeStr,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      };
      account.cvMode = "pdf";
      save();
      renderPdfState();
      pdfStatus.textContent = `PDF "${file.name}" saved! 4 sections cleared.`;
    }

    $("#browse-pdf-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      clearCvSections();
      cvFileInput.click();
    });
    cvDropzone.addEventListener("click", () => {
      clearCvSections();
      cvFileInput.click();
    });
    cvFileInput.addEventListener("change", () => {
      if (cvFileInput.files && cvFileInput.files[0]) {
        handlePdfFile(cvFileInput.files[0]);
      }
    });

    // Drag and Drop
    ["dragenter", "dragover"].forEach(eventName => {
      cvDropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        cvDropzone.classList.add("drag-over");
      });
    });
    ["dragleave", "drop"].forEach(eventName => {
      cvDropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        cvDropzone.classList.remove("drag-over");
      });
    });
    cvDropzone.addEventListener("drop", e => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handlePdfFile(e.dataTransfer.files[0]);
      }
    });

    // Replace and Remove PDF
    $("#replace-pdf-btn").addEventListener("click", () => {
      clearCvSections();
      cvFileInput.click();
    });
    $("#remove-pdf-btn").addEventListener("click", () => {
      account.cvPdf = null;
      account.cvMode = "text";
      save();
      renderPdfState();
      pdfStatus.textContent = "PDF removed.";
    });
  }

  if (page === "job-profile") {
    jobKeys.forEach(key => {
      const input = $("#" + key);
      input.value = typeof account.job[key] === "string" ? account.job[key] : "";
      input.addEventListener("input", saveJob);
    });
    const syncCvCheckbox = $("#sync-cv");
    syncCvCheckbox.checked = account.syncCV !== false;
    syncCvCheckbox.addEventListener("change", saveJob);

    // Custom CV expander toggle
    const customCvToggle = $("#custom-cv-toggle");
    const customCvBody = $("#custom-cv-body");
    let isExpanderOpen = false;

    // Helpers for mutual exclusivity between custom CV 4-sections and custom PDF
    function clearCustomCvSections() {
      customCvInputs.forEach(input => { input.value = ""; });
    }

    function clearCustomInterviewPdf() {
      if (interviewPdf) {
        interviewPdf = null;
        if (interviewPdfInput) interviewPdfInput.value = "";
        interviewPdfDropzone.classList.remove("is-hidden");
        interviewPdfCard.classList.add("is-hidden");
        interviewPdfStatus.textContent = "";
      }
    }

    // Prefill custom CV textareas with account CV if not in PDF mode
    const customCvInputs = $$("[data-job-cv]");
    const isProfilePdf = Boolean(account.cvPdf || account.cvMode === "pdf");
    customCvInputs.forEach((textarea, index) => {
      textarea.value = isProfilePdf ? "" : (account.cv[index] || "");
      textarea.addEventListener("input", clearCustomInterviewPdf);
    });

    customCvToggle.addEventListener("click", () => {
      isExpanderOpen = !isExpanderOpen;
      customCvToggle.classList.toggle("is-open", isExpanderOpen);
      customCvBody.classList.toggle("is-hidden", !isExpanderOpen);
      customCvToggle.setAttribute("aria-expanded", String(isExpanderOpen));
    });

    // Custom PDF Upload handling for this interview
    let interviewPdf = null;
    const interviewPdfDropzone = $("#interview-pdf-dropzone");
    const interviewPdfInput = $("#interview-pdf-input");
    const interviewPdfCard = $("#interview-pdf-card");
    const interviewPdfName = $("#interview-pdf-name");
    const interviewPdfSize = $("#interview-pdf-size");
    const interviewPdfStatus = $("#interview-pdf-status");

    function handleInterviewPdf(file) {
      if (!file) return;
      if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
        interviewPdfStatus.textContent = "Please upload a valid PDF file (.pdf).";
        return;
      }
      clearCustomCvSections();
      const sizeStr = file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
        : Math.round(file.size / 1024) + " KB";

      interviewPdf = { name: file.name, size: sizeStr };
      interviewPdfDropzone.classList.add("is-hidden");
      interviewPdfCard.classList.remove("is-hidden");
      interviewPdfName.textContent = file.name;
      interviewPdfSize.textContent = sizeStr;
      interviewPdfStatus.textContent = `Attached "${file.name}" to this interview. 4 sections cleared.`;
    }

    $("#interview-browse-pdf-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      clearCustomCvSections();
      interviewPdfInput.click();
    });
    interviewPdfDropzone.addEventListener("click", () => {
      clearCustomCvSections();
      interviewPdfInput.click();
    });
    interviewPdfInput.addEventListener("change", () => {
      if (interviewPdfInput.files && interviewPdfInput.files[0]) {
        handleInterviewPdf(interviewPdfInput.files[0]);
      }
    });

    // Drag & Drop
    ["dragenter", "dragover"].forEach(eventName => {
      interviewPdfDropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        interviewPdfDropzone.classList.add("drag-over");
      });
    });
    ["dragleave", "drop"].forEach(eventName => {
      interviewPdfDropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        interviewPdfDropzone.classList.remove("drag-over");
      });
    });
    interviewPdfDropzone.addEventListener("drop", e => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleInterviewPdf(e.dataTransfer.files[0]);
      }
    });

    $("#interview-replace-pdf-btn").addEventListener("click", () => {
      clearCustomCvSections();
      interviewPdfInput.click();
    });
    $("#interview-remove-pdf-btn").addEventListener("click", () => {
      interviewPdf = null;
      interviewPdfDropzone.classList.remove("is-hidden");
      interviewPdfCard.classList.add("is-hidden");
      interviewPdfStatus.textContent = "";
    });

    $("#job-form").addEventListener("submit", event => {
      event.preventDefault();
      saveJob();
      if (jobKeys.slice(0, 4).some(key => !account.job[key])) {
        return error("#job-error", "Enter a value for each job profile field.");
      }
      if (account.job["job-url"]) {
        try {
          const url = new URL(account.job["job-url"]);
          if (!["http:", "https:"].includes(url.protocol)) throw new Error("Unsupported protocol");
        } catch (_) {
          return error("#job-error", "Use a complete http:// or https:// job description link.");
        }
      }

      if (isExpanderOpen) {
        if (interviewPdf) {
          startInterview(["", "", "", ""], interviewPdf);
        } else {
          const customCV = customCvInputs.map(input => input.value);
          startInterview(customCV, null);
        }
      } else {
        if (account.cvPdf || account.cvMode === "pdf") {
          startInterview(["", "", "", ""], account.cvPdf);
        } else {
          startInterview([...account.cv], null);
        }
      }
      go("interview.html");
    });
    $$("[data-save-job]").forEach(link => link.addEventListener("click", saveJob));
  }

  if (page === "interview" || page === "interview-1" || page === "interview-2" || page === "interview-3" || $("#interview-step-track")) {
    const interview = activeInterview() || startInterview();
    const questions = DATA.questions || [
      "Imagine you're tasked with curating a time capsule that defines the year 2026 for an alien civilization. What are three objects you put inside?",
      "To be, or not to be, that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them.",
      "Wat een wartaa. Het is echt niet alsof ik bezorgd om je was ofzo. Mijn colonne verplaatste zich puur toevallig langs deze strategische route, dus haal je maar niks in je hoofd, begrepen?"
    ];
    const totalQuestions = questions.length;

    let currentStep = 0;
    try {
      const params = new URLSearchParams(window.location.search);
      const qParam = parseInt(params.get("q"), 10);
      if (!isNaN(qParam) && qParam >= 1 && qParam <= totalQuestions) {
        currentStep = qParam - 1;
      }
    } catch (_) {}

    while (interview.answers.length < totalQuestions) {
      interview.answers.push("");
    }

    const questionTitle = $("#question-title");
    const questionBadge = $("#question-badge");
    const questionText = $("#question-text");
    const answerInput = $("#answer");
    const charCountEl = $("#answer-char-count");
    const prevBtn = $("#prev-question-btn");
    const nextBtn = $("#next-question-btn");
    const micToggleBtn = $("#mic-toggle-btn");
    const micLabel = $("#mic-btn-label");
    const micSub = $("#mic-btn-sub");
    const voiceWaveform = $("#voice-waveform");
    const exitModal = $("#interview-exit-modal");
    const exitModalName = $("#saved-name");
    const exitModalConfirmBtn = $("#exit-modal-confirm-btn");

    let isRecording = false;
    let recordingTimer = null;

    function updateCharCount() {
      if (!charCountEl || !answerInput) return;
      const count = answerInput.value.length;
      charCountEl.textContent = `${count} character${count === 1 ? "" : "s"}`;
    }

    function renderStep(index) {
      currentStep = Math.max(0, Math.min(index, totalQuestions - 1));

      if (questionTitle) questionTitle.textContent = `Question ${currentStep + 1}`;
      if (questionBadge) questionBadge.textContent = `${currentStep + 1} of ${totalQuestions}`;
      if (questionText) questionText.textContent = questions[currentStep];

      if (answerInput) {
        answerInput.dataset.answer = currentStep;
        answerInput.value = interview.answers[currentStep] || "";
        updateCharCount();
      }

      if (prevBtn) {
        if (currentStep === 0) {
          prevBtn.classList.add("is-hidden");
        } else {
          prevBtn.classList.remove("is-hidden");
        }
      }

      if (nextBtn) {
        if (currentStep === totalQuestions - 1) {
          nextBtn.textContent = "Finalize Interview";
        } else {
          nextBtn.textContent = "Next Question →";
        }
      }

      if (isRecording) {
        stopRecording();
      }
    }

    if (answerInput) {
      answerInput.addEventListener("input", () => {
        interview.answers[currentStep] = answerInput.value;
        save();
        updateCharCount();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentStep > 0) {
          if (answerInput) interview.answers[currentStep] = answerInput.value;
          save();
          renderStep(currentStep - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (answerInput) interview.answers[currentStep] = answerInput.value;
        save();

        if (currentStep < totalQuestions - 1) {
          renderStep(currentStep + 1);
        } else {
          interview.finished = true;
          save();
          go("done-interview.html");
        }
      });
    }

    // Trigger Save & Exit whenever the user attempts to exit the interview screen
    function triggerSaveAndExit(targetHref) {
      if (answerInput) interview.answers[currentStep] = answerInput.value;
      save();

      if (exitModal) {
        if (exitModalName) exitModalName.textContent = interview.name;
        if (exitModalConfirmBtn) {
          const destination = targetHref || "dashboard.html";
          exitModalConfirmBtn.href = destination;
          exitModalConfirmBtn.textContent = "Proceed";
        }
        exitModal.classList.remove("is-hidden");
        $(".site-header").inert = true;
        const mainPanel = $(".interview-panel");
        if (mainPanel) mainPanel.inert = true;
        const footer = $(".site-footer");
        if (footer) footer.inert = true;
        if (exitModalConfirmBtn) exitModalConfirmBtn.focus();
      } else {
        go("interview-interrupt.html");
      }
    }

    $$(".site-header a").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        triggerSaveAndExit(link.getAttribute("href") || "dashboard.html");
      });
    });

    try {
      history.pushState({ interview: true }, "");
      window.addEventListener("popstate", () => {
        triggerSaveAndExit("dashboard.html");
      });
    } catch (_) {}

    function startRecording() {
      isRecording = true;
      if (micToggleBtn) micToggleBtn.classList.add("is-recording");
      if (micLabel) micLabel.textContent = "Recording... (Click to stop)";
      if (micSub) micSub.textContent = "Listening to your voice...";
      if (voiceWaveform) voiceWaveform.classList.add("is-active");

      recordingTimer = setTimeout(() => {
        if (isRecording && answerInput) {
          const sampleSpoken = [
            " In my perspective, this role requires strong adaptability and rapid problem-solving.",
            " Furthermore, I prioritize clear communication and delivering reliable results under pressure.",
            " My previous background gives me a distinct advantage in tackling complex technical challenges."
          ];
          const addition = sampleSpoken[currentStep] || " I believe this approach creates the strongest foundation for success.";
          answerInput.value = (answerInput.value.trim() ? answerInput.value.trim() + " " : "") + addition.trim();
          interview.answers[currentStep] = answerInput.value;
          save();
          updateCharCount();
        }
      }, 2400);
    }

    function stopRecording() {
      isRecording = false;
      if (recordingTimer) clearTimeout(recordingTimer);
      if (micToggleBtn) micToggleBtn.classList.remove("is-recording");
      if (micLabel) micLabel.textContent = "Record Answer with Microphone";
      if (micSub) micSub.textContent = "Click to start speech-to-text";
      if (voiceWaveform) voiceWaveform.classList.remove("is-active");
    }

    if (micToggleBtn) {
      micToggleBtn.addEventListener("click", () => {
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      });
    }

    $$("[data-save-answer]").forEach(link => link.addEventListener("click", () => {
      if (answerInput) interview.answers[currentStep] = answerInput.value;
      save();
    }));

    renderStep(currentStep);
  }

  if (page === "interview-interrupt") {
    const interview = activeInterview();
    if (interview) $("#saved-name").textContent = interview.name;
    $(".site-header").inert = true;
    $(".site-footer").inert = true;
    const home = $(".saved-dialog a");
    home.focus();
    // The source uses a dedicated frame for this dialog.
    $(".saved-dialog").addEventListener("keydown", event => {
      if (event.key === "Tab") { event.preventDefault(); home.focus(); }
    });
  }

  if (page === "done-interview") {
    $("#done-form").addEventListener("submit", event => {
      event.preventDefault();
      const interview = activeInterview() || startInterview();
      const name = $("#interview-name").value.trim();
      if (name) interview.name = name;
      interview.finished = true;
      save();
      go("report.html");
    });
  }

  if (page === "storage") {
    const listContainer = $("#interview-list");
    const emptyContainer = $("#storage-empty");
    const gridHead = $(".storage-grid-head");

    function renderInterviews() {
      listContainer.replaceChildren();
      const total = account.interviews ? account.interviews.length : 0;

      if (total === 0) {
        if (gridHead) gridHead.classList.add("is-hidden");
        if (emptyContainer) emptyContainer.classList.remove("is-hidden");
        return;
      }

      if (gridHead) gridHead.classList.remove("is-hidden");
      if (emptyContainer) emptyContainer.classList.add("is-hidden");

      account.interviews.forEach((interview, index) => {
        const row = document.createElement("div");
        row.className = "storage-row-card";

        // Col 1: Name
        const colName = document.createElement("div");
        colName.className = "col-name-wrap";

        const title = document.createElement("span");
        title.className = "session-title";
        title.textContent = interview.name;

        colName.append(title);

        // Col 2: Date
        const colDate = document.createElement("div");
        colDate.className = "col-date-text";
        colDate.textContent = interview.date;

        // Col 3: Status
        const colStatus = document.createElement("div");
        colStatus.className = "col-status-wrap";

        const status = document.createElement("span");
        status.className = "status" + (interview.finished ? "" : " unfinished");
        status.textContent = interview.finished ? "Finished" : "Unfinished";
        colStatus.append(status);

        // Col 4: Actions (View report / Continue + Delete)
        const colActions = document.createElement("div");
        colActions.className = "col-actions-group";

        const actionLink = document.createElement("a");
        actionLink.className = "btn btn-secondary btn-session-action";
        actionLink.href = interview.finished ? "report.html" : "interview.html";
        actionLink.textContent = interview.finished ? "View report" : "Continue";
        actionLink.addEventListener("click", () => {
          account.activeId = interview.id;
          save();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-session-delete";
        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete";
        deleteBtn.title = "Delete this interview";
        deleteBtn.addEventListener("click", () => {
          account.interviews.splice(index, 1);
          if (account.activeId === interview.id) account.activeId = null;
          save();
          renderInterviews();
        });

        colActions.append(actionLink, deleteBtn);

        row.append(colName, colDate, colStatus, colActions);
        listContainer.append(row);
      });
    }

    renderInterviews();
  }

  if (page === "report") {
    const interview = reportInterview();
    if (interview) {
      if ($("#report-name")) $("#report-name").textContent = interview.name;
      if ($("#report-date") && interview.date) $("#report-date").textContent = interview.date;

      $$("[data-report-answer]").forEach((element, index) => {
        element.textContent = interview.answers[index] || "No answer provided.";
      });

      // Populate CV text sections
      const cvData = interview.cv || account.cv || DATA.cv;
      $$("[data-cv-report]").forEach((element, index) => {
        if (cvData && cvData[index]) {
          element.textContent = cvData[index];
        }
      });
      $$("[data-cv-pdf-text]").forEach((element, index) => {
        if (cvData && cvData[index]) {
          element.textContent = cvData[index];
        }
      });

      // Populate CV editorial feedback
      const feedbackData = DATA.cvFeedback || [];
      $$("[data-cv-feedback]").forEach((element, index) => {
        if (feedbackData[index]) {
          element.textContent = feedbackData[index];
        }
      });

      // Automatically show the CV format chosen by user (PDF or 4 Sections)
      const cvSectionsView = $("#cv-sections-view");
      const cvPdfView = $("#cv-pdf-view");
      const reportPdfName = $("#report-pdf-name");
      const reportPdfMeta = $("#report-pdf-meta");

      const hasPdf = Boolean(interview.cvPdf || (interview.cvMode === "pdf" && account.cvPdf));
      const activePdf = interview.cvPdf || (interview.cvMode === "pdf" ? account.cvPdf : null);

      if (hasPdf && activePdf) {
        if (cvSectionsView) cvSectionsView.classList.add("is-hidden");
        if (cvPdfView) cvPdfView.classList.remove("is-hidden");
        if (reportPdfName) reportPdfName.textContent = activePdf.name || "Candidate_Resume.pdf";
        if (reportPdfMeta) reportPdfMeta.textContent = `Uploaded PDF Document · ${activePdf.size || "340 KB"}`;
      } else {
        if (cvPdfView) cvPdfView.classList.add("is-hidden");
        if (cvSectionsView) cvSectionsView.classList.remove("is-hidden");
      }
    }
  }
  if (page === "system-feedback") {
    const inputs = [0, 1, 2, 3].map(i => $("#feedback-" + i));
    inputs.forEach((input, index) => {
      input.value = typeof account.feedback[index] === "string" ? account.feedback[index] : "";
      input.addEventListener("input", () => { account.feedback = inputs.map(item => item.value); save(); });
    });
    $("#feedback-form").addEventListener("submit", event => {
      event.preventDefault();
      account.feedback = inputs.map(input => input.value);
      save();
      go("thank-you.html");
    });
  }
  if (page === "dashboard") {
    const cards = $$(".reveal-on-scroll");
    if (cards.length > 0) {
      document.body.classList.add("js-scroll-ready");
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        cards.forEach(card => observer.observe(card));
      } else {
        const checkScroll = () => {
          const triggerBottom = window.innerHeight * 0.92;
          cards.forEach(card => {
            if (card.getBoundingClientRect().top < triggerBottom) {
              card.classList.add("is-visible");
            }
          });
        };
        window.addEventListener("scroll", checkScroll, { passive: true });
        checkScroll();
      }
    }
  }

  // Preserve state between separate file:// documents in the same tab.
  window.addEventListener("pagehide", save);
})();
