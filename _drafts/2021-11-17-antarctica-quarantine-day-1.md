---
layout: post
title: Antarctica / Quarantine Pt. 1
thumbnail: /assets/img/2021-11-17/thumbnail.jpg
excerpt: Travelling from London to Cape Town, via Munich, for two weeks of quarantine prior to fieldwork at Neumayer III and the Ekstr&ouml;m Ice Shelf with the ReMeltRadar project at the Univeristy of T&uuml;ebingen.
---
## Day 1 / Wednesday
I'm writing this before my eyelids fall off, having left London at 6am yesterday morning to travel to Cape Town.  One of the 'gateways' to Antarctica, I'm here with the Alfred Wegener Institute (AWI) and colleagues from the University of T&uuml;ebingen to undertake geophysical surveys on the Ekstr&ouml;m Ice Shelf - more on the specifics in a subsequent blog, perhaps.

![Map of Journey from London to Neumayer](/assets/img/2021-11-17/journey-map.jpg)

Quarantining in Cape Town prior to travel to Antarctica is mandatory, agreed by the Council of Managers of Antarctic Programmes to minimise the risk of Coronavirus entering the continent, where options for medical support and evacuations are limited.  It comprises of seven days in room 'total' isolation, followed by a further week of 'managed isolation' where mealtimes are shared and meetings are possible.  Before crossing the threshold, there was a brief change to mingle as we were registered and assigned our hotel rooms, have a coffee after the 24 hours of sleepless travel and break the ice with new colleagues.

![View across to Cape Town from Bloubergstrand](/assets/img/2021-11-17/cape-town-day.jpg)

The rooms provided by AWI and the accompanying view of Robben Island to the west and the centre of Cape Town to the south is stunning.  High winds brought through an interspersed mix of rain showers and sunshine making it hard to tire of looking out of the window or taking in some fresh, sea air on the balcony to the soundtrack of some of South Africa's most consistent surf.  Rumour has it that a kite-surfing competition is due to start later this week, which makes me wonder how much more crowed the bay can get without surfers becoming entangled.

![Kitesurfers in Table Bay](/assets/img/2021-11-17/kite-surfers.jpg)

## Day 2 / Thursday
Happy birthday Matthew!

I woke up to my 7:15am alarm and jumped into the shower to wash away any regret for not choosing the later call for breakfast at 9am.  The sentiment that followed to eat my cereal on the balcony also didn't last long - the vastness of Table Bay in front of the room brings a strong wind which quickly sets on a chill in the morning shade, before the sun has swung round to the west.

![Kitesurfers in Table Bay](/assets/img/2021-11-18/sunset-kite-surfers.jpg)

Most of the day was spent hopping back and forth between the desk and the balcony, dipping my toe in the metaphorical water of the "desk alfresco" (the physical water tantalisingly close below).  Not entirely sure what they had caught, but after a tasty 'catch of the day' for lunch and some more work in the afternoon I tried my hand at a hotel workout in the form of push-ups, sit-ups and planking.  I can probably count on my hands the number of times in my life that I've "worked out" in this way and maintain my preference for exercise in a more mobile manner.  Maybe it will be laps around the room tomorrow.

![Sunset across Table Bay](/assets/img/2021-11-18/sunset-clouds.jpg)

Soon, dinner was deposited at the door in the form of beef ribs, sweet potato mash and grilled sweetcorn.  I was taunted by the fantastic looking nutty chocolate brownie, which was followed up with a call from reception to check that I hadn't eaten any after noting my allergy!  The sun lowered itself behind a band of cloud on the horizon, casting a brilliant backdrop for the ever-present kitesurfers on Bloubergstrand Beach.

## Day 3 / Friday
It feels like there are lots of quirks of the hotel quarantine to learn, and opting for the Danish pastries this morning at breakfast was a good choice - three sweet buttery snacks to eat through the rest of the day.  My elation didn't last long as this morning also marked the first PCR test of the quarantine, however we have fortunately heard this evening that all tests were negative.

Predictably, writing about the same four walls is beginning to feel a bit harder today than the first two days of quarantine and soon I'll have to diversify beyond simply listing what I've been up to.  Joining the radar group seminar this afternoon helped pass the time and provided some food for thought outside the realm of ice-penetrating radar on the topic of RF emitter localisation using UAVs.  During dinner (a vegetable wrap and chips) a member of hotel staff from the from desk delivered a duffel bag from AWI containing my sleeping system for the transfer flight.  After this, I returned to polished off my food and adjusted the table desk so I could finish work facing out across the bay.

![Purple skies and moored cargo ships at sunset](/assets/img/2021-11-19/purple-sky.jpg)

While working through my ApRESProcessing library, I noticed that I had omitted to take into account the fact that in unattended mode, ApRES `*.dat` files can contain multiple bursts.  Without thinking it through in advance, I spent the evening rewriting the library to accommodate for processing the files in parallel without considering that ultimately the file access makes a serial bottleneck unavoidable - whoops.  Fortunately, reviewing the code has not been a waste of time and instead highlighted issues with how the library handles large surveys - most significantly that everything is (attempted to be) stored in memory!

Tomorrow will be the first day of the 'weekend' in quarantine, but the decision as to whether to treat it any differently will have to be one for tomorrow morning.