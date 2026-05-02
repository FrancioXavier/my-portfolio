"use client";

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { CyberpunkButton } from '@/components/ui/CyberpunkButton';

export const ContactForm = () => {
  // Using a placeholder FORM_ID. The user should replace this with their actual Formspree ID.
  const [state, handleSubmit] = useForm("xnnarbkd");

  if (state.succeeded) {
    return (
      <div className="p-12 bg-surface-2 border border-accent text-accent font-mono text-center clip-card animate-fade-up my-8">
        <p className="text-[1.2rem] mb-4 tracking-[0.1em] font-bold"> MESSAGE_TRANSMITTED</p>
        <p className="text-muted text-[0.9rem] max-w-[400px] mx-auto leading-relaxed">
          Your transmission has been successfully encrypted and sent.
          I will analyze the data and respond shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-[650px] mx-auto text-left w-full mt-12 bg-surface/30 p-8 rounded-sm border border-border/50 backdrop-blur-sm">
      <div className="flex flex-col gap-3">
        <label htmlFor="name" className="font-mono text-[0.7rem] uppercase text-accent tracking-[0.2em] font-bold">
          [01] SENDER_NAME
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="ENTER_IDENTIFIER"
          className="bg-bg/50 border border-border p-4 font-mono text-[0.85rem] text-fg focus:border-accent focus:shadow-[0_0_15px_oklch(82%_0.22_195_/_0.2)] focus:outline-none transition-all clip-btn placeholder:text-muted/30"
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
          className="text-accent-2 font-mono text-[0.7rem] mt-2 italic"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="font-mono text-[0.7rem] uppercase text-accent tracking-[0.2em] font-bold">
          [02] SENDER_EMAIL
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="ENTER_ENCRYPTED_ADDR"
          className="bg-bg/50 border border-border p-4 font-mono text-[0.85rem] text-fg focus:border-accent focus:shadow-[0_0_15px_oklch(82%_0.22_195_/_0.2)] focus:outline-none transition-all clip-btn placeholder:text-muted/30"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-accent-2 font-mono text-[0.7rem] mt-2 italic"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="message" className="font-mono text-[0.7rem] uppercase text-accent tracking-[0.2em] font-bold">
          [03] TRANSMISSION_DATA
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="ESTABLISHING_COMMUNICATION_PROTOCOL..."
          className="bg-bg/50 border border-border p-4 font-mono text-[0.85rem] text-fg focus:border-accent focus:shadow-[0_0_15px_oklch(82%_0.22_195_/_0.2)] focus:outline-none transition-all clip-btn placeholder:text-muted/30 resize-none"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-accent-2 font-mono text-[0.7rem] mt-2 italic"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
        <div className="hidden sm:block font-mono text-[0.6rem] text-muted/40 uppercase tracking-widest">
          SYSTEM_READY // SECURE_LINE_ESTABLISHED
        </div>
        <CyberpunkButton
          type="submit"
          disabled={state.submitting}
          className={state.submitting ? "opacity-50 cursor-wait" : ""}
        >
          {state.submitting ? "INITIALIZING..." : "EXECUTE: SEND"}
        </CyberpunkButton>
      </div>
    </form>
  );
};

export default ContactForm;
