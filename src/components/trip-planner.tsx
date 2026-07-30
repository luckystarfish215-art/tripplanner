"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import type { Choice, TripContent } from "@/types/trip";

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) { return <div className="mb-5"><p className="section-eyebrow">{eyebrow}</p><h2>{title}</h2></div>; }
function Choices({ choices, selected, onSelect }: { choices: Choice[]; selected: string; onSelect: (id: string) => void }) { return <div className="grid gap-2.5 sm:grid-cols-3">{choices.map((choice) => <button className={`option-card ${selected === choice.id ? "option-card-active" : ""}`} key={choice.id} onClick={() => onSelect(choice.id)} type="button"><Icon name={choice.icon} /><span className="mt-5 block font-medium text-white">{choice.label}</span><span className="mt-1 block text-xs text-white/45">{choice.description}</span></button>)}</div>; }
function Counter({ description, label, onChange, value }: { description: string; label: string; onChange: (value: number) => void; value: number }) { return <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0"><div><p className="font-medium text-white">{label}</p><p className="mt-0.5 text-sm text-white/45">{description}</p></div><div className="flex items-center gap-3"><button aria-label={`Remove ${label}`} className="count-button" onClick={() => onChange(Math.max(0, value - 1))} type="button"><Icon name="minus" /></button><span className="w-4 text-center text-sm font-medium">{value}</span><button aria-label={`Add ${label}`} className="count-button" onClick={() => onChange(value + 1)} type="button"><Icon name="plus" /></button></div></div>; }

export function TripPlanner({ content }: { content: TripContent }) {
  const [destination, setDestination] = useState(""); const [experience, setExperience] = useState(content.experiences.choices[0].id); const [style, setStyle] = useState(content.style.choices[1].id); const [budget, setBudget] = useState(content.budget.choices[1].id); const [travellers, setTravellers] = useState({ adults: 2, children: 0 }); const count = travellers.adults + travellers.children;
  return <form className="planner-card" onSubmit={(event) => event.preventDefault()}>
    <section className="planner-section"><Heading {...content.destination} /><label className="destination-input"><Icon name="compass" /><input onChange={(event) => setDestination(event.target.value)} placeholder={content.destination.placeholder} value={destination} /><span>{content.destination.helper}</span></label></section>
    <section className="planner-section"><Heading {...content.dates} /><div className="grid grid-cols-2 gap-2.5">{[content.dates.departure, content.dates.return].map((date) => <button className="date-card" key={date} type="button"><Icon name="calendar" /><span>{date}</span><Icon name="chevron" /></button>)}</div></section>
    <section className="planner-section"><Heading {...content.experiences} /><Choices choices={content.experiences.choices} onSelect={setExperience} selected={experience} /></section>
    <section className="planner-section"><Heading {...content.style} /><Choices choices={content.style.choices} onSelect={setStyle} selected={style} /></section>
    <section className="planner-section"><Heading {...content.travellers} /><div className="traveller-card"><div className="mb-5 flex items-center justify-between border-b border-white/8 pb-4"><span className="icon-well"><Icon name="users" /></span><span className="text-sm text-white/55">{count} {content.travellers.peopleLabel}</span></div>{content.travellers.types.map((traveller) => <Counter {...traveller} key={traveller.id} onChange={(value) => setTravellers((current) => ({ ...current, [traveller.id]: value }))} value={travellers[traveller.id as keyof typeof travellers]} />)}</div></section>
    <section className="planner-section"><Heading {...content.budget} /><Choices choices={content.budget.choices} onSelect={setBudget} selected={budget} /></section>
    <button className="generate-button" type="submit"><span>{content.generate}</span><Icon name="arrow" /></button>
  </form>;
}
