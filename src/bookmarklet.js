javascript: (function () {
  /**
   * Form Filler Bookmarklet
   * Created by Shpetim Haxhiu (https://pito.dev)
   *
   * This bookmarklet uses OpenAI's GPT-4o-mini to automatically generate
   * realistic sample data for any web form. Click on a form to activate,
   * and click again to fill it with AI-generated data.
   */

  /**
   * Extracts the structure of the form including field names, types, and attributes
   * @param {HTMLFormElement} form - The form element to analyze
   * @return {Object} An object containing the form field structure
   */
  function getFormStructure(form) {
    const structure = {
      fields: [],
    };
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (
        (element.tagName === "INPUT" ||
          element.tagName === "SELECT" ||
          element.tagName === "TEXTAREA") &&
        element.type !== "hidden"
      ) {
        structure.fields.push({
          name: element.name,
          type: element.type,
          tagName: element.tagName,
          id: element.id,
          placeholder: element.placeholder,
        });
      }
    }
    return structure;
  }

  /**
   * Creates a visual overlay to indicate form selection
   * @return {HTMLElement} The created overlay element
   */
  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 128, 255, 0.3); /* Semi-transparent blue */
            z-index: 10000; /* Ensure it's on top */
            pointer-events: none; /* Allows clicks to pass through */
            border: 2px dashed blue; /* Visual indication of selection area */
        `;
    overlay.id = "form-autofill-overlay";
    document.body.appendChild(overlay);
    return overlay;
  }

  /**
   * Removes the selection overlay from the DOM
   */
  function removeOverlay() {
    const overlay = document.getElementById("form-autofill-overlay");
    if (overlay) {
      overlay.remove();
    }
  }

  /**
   * Sends form structure to OpenAI API to generate form data
   * @param {Object} formStructure - The structure of the form fields
   * @param {HTMLFormElement} formElement - The form element to fill
   */
  async function sendToOpenAI(formStructure, formElement) {
    // Get or prompt for API key
    let apiKey = localStorage.getItem("form_filler_openai_api_key");
    if (!apiKey) {
      apiKey = prompt("Please enter your OpenAI API key:");
      if (apiKey) {
        localStorage.setItem("form_filler_openai_api_key", apiKey);
      }
    }

    if (!apiKey) {
      alert("OpenAI API key is required to use this bookmarklet.");
      return;
    }

    // Create prompt for the AI
    const ai_prompt = `
            You are a form-filling assistant.  Given the following HTML form structure,
            generate realistic, plausible sample data to fill the form.  Return the data
            as a JSON object where the keys are the form field names.  Do not include
            any explanation or preamble before the JSON.  The JSON should have a flat
            structure (no nested objects unless the form field itself implies a hierarchy).
            Ensure that the data types in the JSON match the input types
            (e.g., numbers for number fields, dates for date fields, etc.).
            Be creative and generate diverse, realistic-looking data.  If a field
            name suggests personal information, generate plausible examples of that
            information.  If a field is a select dropdown, choose one of the options.
            If you don't know what to put, use a safe default value of "test".

            Form Structure:
            ${JSON.stringify(formStructure, null, 2)}
        `;

    try {
      // Send request to OpenAI
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: ai_prompt,
              },
            ],
            response_format: { type: "json_object" },
          }),
        }
      );

      // Handle API errors
      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API Error:", errorData);
        alert(
          `Error: ${response.status} - ${
            errorData.error?.message ||
            "Failed to communicate with OpenAI.  Check console for details."
          }`
        );
        return;
      }

      // Process the response
      const data = await response.json();
      const completion = data.choices?.[0]?.message?.content;

      if (!completion) {
        alert("Error: No completion was returned from the OpenAI API.");
        return;
      }

      // Parse JSON response
      let jsonData;
      try {
        jsonData = JSON.parse(completion);
      } catch (parseError) {
        console.error("Error parsing JSON response:", completion);
        alert(
          "Error: Could not parse the JSON response from OpenAI.  The response was: " +
            completion
        );
        return;
      }
      fillForm(formElement, jsonData);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  }

  /**
   * Safely dispatches an event on an element if it supports event dispatching
   * @param {HTMLElement} element - The element to dispatch the event on
   * @param {string} eventName - The name of the event to dispatch
   */
  function safeDispatchEvent(element, eventName) {
    try {
      // Check if the element is null or undefined
      if (!element) {
        return;
      }

      // Handle case where element might be a collection (NodeList or array)
      if (element.length !== undefined && typeof element !== "string") {
        // If element is a collection, iterate through items
        for (let i = 0; i < element.length; i++) {
          if (element[i] && typeof element[i].dispatchEvent === "function") {
            element[i].dispatchEvent(new Event(eventName, { bubbles: true }));
          }
        }
      } else if (typeof element.dispatchEvent === "function") {
        // Single element case
        element.dispatchEvent(new Event(eventName, { bubbles: true }));
      }
    } catch (error) {
      console.warn(
        `Could not dispatch ${eventName} event on element:`,
        element,
        error
      );
    }
  }

  /**
   * Fills the form with the generated data
   * @param {HTMLFormElement} form - The form element to fill
   * @param {Object} data - The data to fill the form with
   */
  function fillForm(form, data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = form.elements[key];
        if (element) {
          const value = data[key];

          // Handle different input types
          if (element.type === "select-one") {
            // Find matching option in select dropdown
            for (let i = 0; i < element.options.length; i++) {
              if (
                element.options[i].value === value ||
                element.options[i].text === value
              ) {
                element.selectedIndex = i;
                break;
              }
            }
          } else if (element.type === "radio") {
            // Find and check the correct radio button
            const radioElements = form.querySelectorAll(`input[name="${key}"]`);
            if (radioElements.length) {
              for (let i = 0; i < radioElements.length; i++) {
                if (radioElements[i].value === value) {
                  radioElements[i].checked = true;
                  break;
                }
              }
            }
          } else if (element.type === "checkbox") {
            // Set checkbox state based on boolean value
            if (value === true || value === "true" || value === 1) {
              element.checked = true;
            } else {
              element.checked = false;
            }
          } else {
            // Default case for text inputs, textareas, etc.
            element.value = value;
          }

          // Trigger events to ensure form validation and reactive frameworks update
          safeDispatchEvent(element, "input");
          safeDispatchEvent(element, "change");
        }
      }
    }
    alert("Form filled with sample data!");
  }

  // State variables
  let selectedForm = null;
  let overlay = null;

  /**
   * Handles click events for form selection and filling
   * @param {Event} event - The click event
   */
  function handleClick(event) {
    const target = event.target;

    // If a form is already selected, process it
    if (selectedForm) {
      removeOverlay();
      document.removeEventListener("click", handleClick, true);
      sendToOpenAI(getFormStructure(selectedForm), selectedForm);
      selectedForm = null;

      // Remove the overlay
      removeOverlay();
      return;
    }

    // Find the closest form element to the click
    const form = target.closest("form");
    if (form) {
      event.preventDefault();
      selectedForm = form;
      overlay = createOverlay();

      // Highlight the selected form
      form.style.border = "2px solid blue";
      form.style.boxShadow = "0 0 5px blue";

      // Update overlay with instructions
      overlay.textContent = "Click again on this form to autofill it...";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.color = "blue";
      overlay.style.fontWeight = "bold";
      overlay.style.fontFamily = "sans-serif";

      document.addEventListener("click", handleClick, true);
    }
  }

  // Initialize the bookmarklet by attaching the click handler
  document.addEventListener("click", handleClick, true);
})();
