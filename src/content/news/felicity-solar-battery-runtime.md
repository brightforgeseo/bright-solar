---
id: A06
job: 4036
slug: felicity-solar-battery-runtime
title: "Felicity Solar Batteries: What Determines Appliance Runtime?"
metaTitle: "Felicity Solar Battery Runtime: What Determines Appliance Hours"
description: "Same kWh labels can run appliances for different hours. See how usable capacity, load duty and inverter limits shape Felicity Solar battery runtime, and which documents to send us."
summary: "What actually determines appliance hours on a Felicity Solar battery, beyond the kWh label."
sourceSha256: 60b08c43923f15fb904f25c775bc895251edc402e9cf9ce40b86d27eedfef08e
published: true
---

A kilowatt-hour figure on a battery tells you how much energy the pack is rated to hold. It does not tell you how long a fridge, a lighting circuit or a modem will stay on when you need stored power. Felicity Solar battery runtime is an outcome of usable energy, the appliances you actually run, how full the battery is when you start, and the inverter’s power limits. Two packs with the same advertised capacity can therefore support different hours of use.

We sell Felicity Solar brand products and help you clarify what storage is for before anyone treats a label as a promise. The useful comparison is not which sticker looks larger. It is which limits apply to the exact battery and inverter on a quotation, and which appliances those limits have to serve.

## Why The Capacity Label Is Not Runtime

Nameplate energy is a rating. Runtime is a job. The job changes as soon as the load list changes, even if the battery figure stays the same. A pack sized around a fridge, lights and a communications load is doing different work from a pack asked to hold air conditioning, a pump and the rest of the house at the same time. The label does not know which of those jobs you have in mind.

Stored energy and output power describe different battery limits. Energy is how much you can draw over time. Power is how hard the system can work at one moment. A pack can still show remaining charge while a connected load exceeds what the battery, the inverter or the protection behaviour will allow. In that case the appliances stop because of a power limit, not because the energy tank is empty. Mixing the two figures is how a “same capacity” comparison becomes misleading.

Manufacturer documentation for household lithium iron phosphate packs typically lists both kinds of field: a capacity figure, and recommended or short-duration charge and discharge power. Those fields exist so a designer can check two separate questions. They are not a calculator that converts the capacity line into hours for your house. Use the depth of discharge, current and power limits specified for the exact models on your quote.

If the aim is selected circuits during an outage, that is a backup design question, not a bigger sticker. A [hybrid backup assessment](/hybrid-solar/) starts with the essential loads and the hours you need them, then looks at compatible equipment. If the property has no dependable grid, [off-grid energy planning](/off-grid-solar/) has to cover the whole day’s electricity use and periods of weak sun, not a single evening snapshot. Those routes share battery physics. They do not share the same system scope.

## Usable Energy, Starting Charge And Reserve

Felicity Solar usable battery capacity is the energy the quoted model is allowed to deliver under the limits in its own documentation, not the marketing line on a brochure. Nameplate energy and usable energy answer different comparisons. Practical constraints, including the depth of discharge the manufacturer states for that model, reduce what can actually leave the pack. Asking which figure the quotation is using is the first check that changes the decision.

When you already have a quotation, ask for the current user guide and datasheet for those exact battery and inverter models. Look for the usable or allowable energy statement, the discharge power limits, and how the manufacturer describes protection at low charge. Household packs in this class typically include a battery management system that will stop discharge to protect the cells. That cut-off is a safety and product limit. It is not leftover runtime you can bargain for.

If the quote already gives usable energy, do not apply the same depth of discharge again as if the figure were still a raw nameplate. A reserve you choose to keep for later in the outage is a planning decision about how much of the remaining allowable energy you will spend now. It is not an automatic second deduction from a number that has already been reduced to usable energy, unless the quotation treats reserve and usable energy as separate, stated allowances. Stacking the same constraint twice makes the pack look weaker than the documents support. Ignoring a stated reserve makes it look stronger than you intended to operate.

Starting state of charge matters as much as the pack size. A battery that is only partly charged when the grid fails cannot deliver the same duration as the same battery starting near full, even when both carry the same nameplate. Many household packs show state of charge on a display for that reason: it is a live condition, not a catalogue feature. Time of day, whether solar charging was available, and whether you had already been drawing storage all change the starting point. Runtime estimated from a full-pack assumption will not match an evening that begins at a lower charge.

Felicity Solar is the product family we sell, but the brand name alone does not identify usable energy. Ask for the current datasheet and user guide matching the exact battery on your proposal. Keep the model and document revision together so you are not comparing one pack against another pack’s limits.

## Running Load, Startup And Daily Duty

Appliances do not all ask the same thing of a battery. A light that draws a steady, modest power is mainly an energy question: how long you leave it on. A refrigerator or air conditioner is also a power question, because the compressor starts harder than it runs. The running figure on a rating plate does not describe that start. Water pumps and other motor loads behave the same way. If several of those loads start together, the system has to cover the combined surge, not the average of their running watts.

An inverter’s surge rating describes short-duration output above its continuous rating. It is a power capability, not extra stored energy. Check both ratings for the exact inverter on the quote. A starting demand beyond the supported limit can interrupt the load even while the battery still holds energy.

How often an appliance runs and how long it runs affect its energy use. A fridge that cycles through the night uses energy differently from the same fridge opened constantly in a hot kitchen. Lighting left on for the whole outage is not the same duty as lighting used in short periods. Cooling equipment with compressors also varies with weather and how hard the compressor works; a utility consumption tool for Meralco-served homes even notes that cooling estimates can diverge from actual use in hotter months. A single wattage, even when it is correct, does not fix the hours.

Daily duty is the schedule, not a catalogue of every appliance you own. For backup, list the circuits you intend to keep on, which of them may run at the same time, and which you can leave off. Adding every load to the essential list changes both the power the inverter must supply and the energy the battery must hold. A shorter, honest list produces a more useful assessment than “keep the whole house”. For a property without a dependable grid, the inventory has to include continuous loads, occasional loads and anything you expect to add, because the system has to cover the day rather than a short interruption. Seasonal changes belong on that list when they are real, not when they are guessed to make the maths tidy.

Do not open equipment or electrical enclosures to check watts. Use documentation, rating plates you can read safely, and the schedule of how you actually live in the house. Where a figure is unknown, say so. A missing load is easier to investigate than a guessed number presented as fact. Keep unknown ratings marked as unknown, and bring the appliance schedule with the quoted equipment documents before relying on an estimate of hours.

## Inverter Losses And Power Limits

The battery stores energy as direct current. Household appliances almost always need alternating current. The inverter performs that conversion, and conversion is not lossless. Some of the stored energy is spent as heat and control overhead on the way to the socket. Round-trip efficiency, which compares energy put into the battery during charging with energy later recovered, is a different measurement from the one-way losses on discharge through the inverter. Do not use a round-trip figure as if it were the only deduction that applies while you are running loads, and do not stack it on top of a usable-energy figure in a way the documentation does not support. Charge-side losses already happened when the pack was filled. Discharge-side conversion is what remains while appliances are on.

The inverter also caps how much power can be delivered at once, regardless of how much energy remains. If the continuous load sits near that cap, voltage, temperature or protection behaviour can shorten what you experience as runtime even though the battery is not empty. Overload, high temperature and low-battery warnings exist in inverter and battery interfaces for that reason. They are operating limits, not extra capacity. Reducing the simultaneous load is a duty choice. It is not the same as discovering hidden kilowatt-hours.

Cable sizing, installation environment and the way the battery and inverter communicate also sit in the manufacturer instructions. A household lithium iron phosphate pack typically includes a battery management system and may support communication with a compatible inverter. Same-brand labels do not, by themselves, prove a supported pairing. Compatibility, charge and discharge settings and expansion conditions have to be checked for the models on the proposal. We do not treat a hybrid badge or a shared brand name as proof that a given inverter and battery will behave as a backup pair.

Temperature and state of charge can affect the recommended charge and discharge power. Manufacturer notes often say recommended current and power depend on those conditions. A label rating written for a moderate operating window is not automatically the same operating point as a hot afternoon outage or a pack that is already low. That is another reason two identical capacity stickers, used in different conditions, do not deliver the same appliance hours.

## Documents We Need For A Model-Specific Assessment

We do not give a numerical runtime from a brand name, a photograph or a monthly bill total. A bill shows consumption over a billing period. It does not show which appliances ran together, which would stay on in an outage, or what the inverter can supply. Site information and equipment documentation close that gap. Until they are in the same conversation, the capacity label remains a starting rating, not an answer in hours.

For a model-specific discussion, gather the exact battery and inverter models on the quotation, with the current datasheets and user guides for those revisions. Note the stated nameplate energy, the usable or allowable energy if the documents separate them, and any reserve the designer has written down as a remaining allowance rather than a second guess. Add the essential appliance or circuit list, with running ratings from documentation where you have them, any known starting behaviour, which loads may run at once, and how long you need them.

Say whether the job is stored solar for later in the day, selected backup during a grid outage, or independent supply with no dependable grid. Those jobs share the energy and power distinction above, and they still need different system design. If you already have solar, an inverter or storage, bring those model details. Adding a Felicity Solar battery is a pairing and settings question, not only a larger energy figure.

Bring that pack to a solar assessment. We use it to clarify system scope and electricity use, then to explain what the quoted Felicity Solar equipment is being asked to do. A remote conversation still does not replace a site-specific check of electrical conditions and installation requirements. Any estimate has to be built from the documents and the schedule you actually intend, not from a generic hours-per-kilowatt-hour rule.

If the documents are missing, ask the quotation to name models and attach manuals before you compare runtimes across offers. Comparing two capacity labels without usable energy, inverter power and the load list is how identical stickers produce different evenings in practice. Check the operating limits against the model named on the offer.

Felicity Solar battery runtime is determined by usable stored energy, starting charge, the real appliance duty, inverter conversion and the power the system can deliver at once. The advertised capacity is only the first of those inputs. Send us the quoted equipment documentation and the appliance schedule you care about. That is the next step we can actually work from: a model-specific assessment of the appliances and hours you need to support.
