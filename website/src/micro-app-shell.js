export function trackMicroApp(eventName, details = {}) {
  const payload = {
    event_category: 'homeowner_micro_app',
    page_path: window.location.pathname,
    ...details,
  };
  if (typeof window.gtag === 'function') window.gtag('event', eventName, payload);
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: eventName, ...payload });
}

export function createQuestionFlow({ form, questions, progressBar, progressText, backButton, nextButton, onComplete }) {
  let step = 0;

  function render() {
    questions.forEach((question, index) => question.classList.toggle('active', index === step));
    const selected = questions[step].querySelector('.option.selected');
    progressBar.style.width = `${((step + 1) / questions.length) * 100}%`;
    progressText.textContent = `Question ${step + 1} of ${questions.length}`;
    backButton.disabled = step === 0;
    nextButton.disabled = !selected;
    nextButton.textContent = step === questions.length - 1 ? 'Show my result' : 'Next question';
  }

  form.addEventListener('click', (event) => {
    const option = event.target.closest('.option');
    if (!option) return;
    option.parentElement.querySelectorAll('.option').forEach((item) => item.classList.remove('selected'));
    option.classList.add('selected');
    const input = option.querySelector('input');
    if (input) input.checked = true;
    nextButton.disabled = false;
  });

  backButton.addEventListener('click', () => {
    if (step > 0) step -= 1;
    render();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!questions[step].querySelector('.option.selected')) return;
    if (step < questions.length - 1) {
      step += 1;
      render();
      return;
    }
    onComplete(new FormData(form));
  });

  render();
}

export function wireHelpRequest({ container, form, tool, getResult }) {
  const situationField = form.querySelector('[name="situation"]');
  const message = form.querySelector('.message');
  const submit = form.querySelector('[type="submit"]');

  container.querySelectorAll('.help-choice').forEach((button) => {
    button.addEventListener('click', () => {
      container.querySelectorAll('.help-choice').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      situationField.value = button.dataset.situation;
      form.classList.add('visible');
      form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      trackMicroApp('micro_app_help_selected', { tool, situation: button.dataset.situation, result: getResult().result });
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const result = getResult();
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      zip: data.get('zip'),
      roofType: data.get('roofType'),
      timeline: data.get('timeline'),
      situation: data.get('situation'),
      consent: data.get('consent') === 'yes',
      tool,
      result: result.result,
      urgency: result.urgency,
    };

    message.className = 'message';
    message.textContent = 'Sending your request…';
    submit.disabled = true;

    try {
      const response = await fetch('/api/homeowner-lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.error || 'We could not send your request.');
      message.className = 'message ok';
      message.textContent = 'Request received. These details will be used only to help with the roofing request you selected.';
      trackMicroApp('micro_app_lead_submitted', { tool, situation: payload.situation, result: payload.result, urgency: payload.urgency });
      form.reset();
    } catch (error) {
      message.className = 'message error';
      message.textContent = error.message || 'We could not send your request. Please try again.';
    } finally {
      submit.disabled = false;
    }
  });
}
