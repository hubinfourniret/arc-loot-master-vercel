import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What is Stash Value?",
    answer: "Stash Value represents the total coin worth of all items in your inventory. It's calculated by multiplying each item's sell value by its quantity, giving you a clear picture of your current wealth in Arc Raiders."
  },
  {
    question: "How do I maximize expedition coins?",
    answer: "Focus on items with high value-to-weight ratios. Use the Tier Table to identify the most profitable items to carry. Prioritize Legendary and Rare items when possible, and always fill your weight capacity before extraction."
  },
  {
    question: "What's the weight limit?",
    answer: "The standard carrying capacity is 150kg for your stash and 50kg for raid loadouts. You can increase these limits with gear like the Assault Pack (+20kg) or Exo-Skeleton Frame (+50kg)."
  },
  {
    question: "Can I share my loadout with friends?",
    answer: "Yes! Use the 'Share Link' button in the Loadout Optimizer section. This generates a URL containing your current loadout configuration that you can send to teammates."
  },
  {
    question: "How is Recycle Value calculated?",
    answer: "Recycle Value is 50% of your total Stash Value. It represents what you'd get from breaking down all your items instead of selling them at full price. Useful for crafting material planning."
  },
  {
    question: "What does the Value/Weight Ratio mean?",
    answer: "This ratio shows coins per kilogram (c/kg). Higher ratios indicate more efficient items to carry. The best loot has high value but low weight, maximizing your profit per raid run."
  }
];

export function FAQ() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <HelpCircle className="w-8 h-8 text-primary" />
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">Everything you need to know about the calculator</p>
        </div>

        <div className="card-tactical rounded-lg p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
