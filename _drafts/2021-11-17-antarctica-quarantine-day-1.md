---
layout: post_toc
title: Antarctica / Quarantine Pt. 1
thumbnail: /assets/img/2021-11-19/thumbnail.jpg
excerpt: Travelling from London to Cape Town, via Munich, for two weeks of quarantine prior to fieldwork at Neumayer III and the Ekstr&ouml;m Ice Shelf with the ReMeltRadar project at the Univeristy of T&uuml;ebingen.
---
## Day 1 / Wednesday
I'm writing this before my eyelids fall off, having left London at 6am yesterday morning to travel to Cape Town.  One of the 'gateways' to Antarctica, I'm here with the Alfred Wegener Institute (AWI) and colleagues from the University of T&uuml;ebingen to head to [Neumayer-Station III](https://en.wikipedia.org/wiki/Neumayer-Station_III) and undertake geophysical surveys on the [Ekstr&ouml;m Ice Shelf](https://en.wikipedia.org/wiki/Ekstr%C3%B6m_Ice_Shelf).  It has been a long time in preparation and planning, and I'm glad to finally be here.

![Map of Journey from London to Neumayer](/assets/img/2021-11-17/journey-map.jpg)

For the 2021-2022 season, two weeks of quarantine prior to travel to Antarctica is mandatory, agreed by the [Council of Managers of Antarctic Programmes](https://www.comnap.aq/) to minimise the risk of Coronavirus entering the continent, where options for medical support and evacuations are limited.  It comprises of seven days in room 'total' isolation, followed by a further week of 'managed isolation' where mealtimes are shared and meetings are possible.  Before crossing the threshold, there was a brief chance to mingle, have a coffee after the 24 hours of sleepless travel and break the ice with new colleagues as we were registered and assigned our hotel rooms.

![View across to Cape Town from Bloubergstrand](/assets/img/2021-11-17/cape-town-day.jpg)

The rooms provided by AWI are generously large and the accompanying view of Robben Island to the west and the centre of Cape Town to the south is stunning.  High winds brought through an interspersed mix of rain showers and sunshine making it hard to tire of looking out of the window or taking in some fresh, sea air on the balcony to the soundtrack of some of South Africa's most consistent surf.  Rumour has it that a kite-surfing competition is due to start later this week, which makes me wonder how much more crowded the bay can get without surfers becoming entangled in each others lines.

![Kitesurfers in Table Bay](/assets/img/2021-11-17/kite-surfers.jpg)

## Day 2 / Thursday
Happy birthday Matthew!

I woke up to my 7:15am alarm and jumped into the shower to wash away any regret for not choosing the later call for breakfast at 9am.  The idea of eating my cereal on the balcony didn't last long - the vastness of Table Bay that lays out in front of the hotel carries a strong wind, which quickly sets on a chill in the morning shade, before the sun has swung round to the west.

![Kitesurfers in Table Bay](/assets/img/2021-11-18/sunset-kite-surfers.jpg)

Most of the day was spent hopping back and forth between the desk and the balcony, dipping my toe in the metaphorical water of the "desk alfresco" (the physical water tantalisingly close below).  Not entirely sure what they had caught, but after a tasty 'catch of the day' for lunch and some more work in the afternoon I tried my hand at a hotel workout in the form of push-ups, sit-ups and planking.  I can probably count on my hands the number of times in my life that I've "worked out" in this way and maintain my proclivity for exercise in a more mobile manner (preferably on my bike).  Maybe it will be laps around the room tomorrow.

![Sunset across Table Bay](/assets/img/2021-11-18/sunset-clouds.jpg)

Soon, dinner was deposited at the door in the form of beef ribs, sweet potato mash and grilled sweetcorn.  I was taunted by the fantastic looking nutty chocolate brownie which also sat on the tray.  Reception then called to check that I hadn't eaten any after noting my allergy on the breakfast order form handed in that morning!  The sun lowered itself behind a band of cloud on the horizon, casting a brilliant backdrop for the ever-present kitesurfers on Bloubergstrand Beach.

## Day 3 / Friday
It feels like there are lots of quirks of the hotel quarantine to learn, and opting for the Danish pastries this morning at breakfast was a good choice - three sweet buttery snacks to eat through the rest of the day.  My elation didn't last long as this morning also marked the first nostril-busting PCR test of the quarantine, however we have fortunately heard this evening that all tests were negative.

Predictably, writing from within and about the same four walls is beginning to feel a bit harder today than the first two days of quarantine and soon I'll have to diversify beyond simply listing what I've been up to.  Joining the radar group seminar this afternoon helped pass the time and provided some food for thought outside the realm of ice-penetrating radar on the topic of RF emitter localisation using UAVs.  During dinner (a vegetable wrap and chips) a member of hotel staff from the from desk delivered a duffel bag from AWI containing my sleeping system for the transfer flight.  After this, I returned to polished off my food and adjusted the table desk so I could finish work facing out across the bay.

![Purple skies and moored cargo ships at sunset](/assets/img/2021-11-19/purple-sky.jpg)

While working through my ApRESProcessing library, I noticed that I had omitted to take into account the fact that in unattended mode, ApRES `*.dat` files can contain multiple bursts.  Without thinking it through in advance, I spent the evening rewriting the library to accommodate for processing the files in parallel without considering that ultimately the file access makes a serial bottleneck unavoidable.  Fortunately, reviewing the code has not been a waste of time and instead highlighted issues with how the library handles large surveys - most significantly that everything is (attempted to be) stored in memory!

Tomorrow will be the first day of the 'weekend' in quarantine, but the decision as to whether to treat it any differently will have to be one for tomorrow morning.

--------------------------------------------------------------

**Nerd Note:** Revisiting the above on Saturday morning it appears that there is still a processing speedup to be found from loading files on multiple cores.  From a test set of 32 `*.dat` files each containing 7 bursts, it look _106.39 seconds_ to load in series and _62.97 seconds_ to load in parallel across 4 cores.

## Day 4 / Saturday
After heading to bed late catching up with Faye and her first day at the Kendal Mountain Festival, dreams of a lie in were thwarted by my foolish request yesterday for the early breakfast slot again.  As can be seen from yesterday's *nerd note*, my code was still on my mind and some more in-depth reading of the MATLAB documentation pointed to a solution.  Hopefully its no surprise now that the majority of quarantine is being spent either with my head pointed out of the window or into my work on a computer screen...

<video src="/assets/media/2021-11-20/table-mountain.mp4" loop muted playsinline uk-video="autoplay: inview"></video>

As mentioned, AWI delivered kit bags yesterday to be checked prior to our flights after quarantine.  Duly, the sleeping bag and mat were laid out and the kit list cross-checked before leaving it back outside the room to be collected.  Lunch promptly arrived in the form of ravioli with the unusual flavour combination of butternut squash and cinnamon, which reminded me of the [butternut squash ravioli recipe](http://deliciousandsustainable.com/article/life-notes/butternut-squash-and-amaretti-ravioli) that I made a few years ago.

![My generously sized room for the duration of quarantine.](/assets/img/2021-11-20/room.jpg)

In the afternoon, between bouts of working in MATLAB, I took a time-lapse video of the clouds that tumble over Table Mountain into Platterklip Gorge and scenes across the bay to make a change from the already hundreds of photos I've managed to take.  Later in the afternoon, I was joined on the balcony by what looked like a juvenile speckled pigeon and its parents as the juvenile struggled to take off again.  The red-circled eyes of the adults are striking and have an air of theatrical make-up or warpaint drawn upon a regular rock pigeon.

![Speckled pigeons resting on the edge of the balcony.](/assets/img/2021-11-20/speckled-pigeon.jpg)

## Day 5 / Sunday
I slept well last night despite another late bedtime, this time caused by falling down the rabbit hole of strange Git behaviour on the UCL EEE servers.  Eventually I decided it was best left for the morning, with less bleary-eyed Googling it was quickly resolved and I was able to get some data churning away.  Ironically I felt asleep before I could finish writing this on Sunday as it was late again by the time came to writing (so this has been written on Monday).

Lunch and dinner were particularly tasty today.  The "tagliatelle Italian" or meatballs in tomato sauce were cooked well and a nice comfort food.  For dinner I had chicken in a BBQ sauce with rice, and for dinner a baked milk tart with raspberry sorbet - delicious!  Most of the evening was spent fiddling with the data but as is ritual I took some time out on the balcony to photograph the sunset.

![Light of the setting sun caught on the wet sand after a wave breaks](/assets/img/2021-11-21/sun-in-waves.jpg)

Later in the evening I took a bath and re-watched School of Rock.  It stands the test of time pretty well and was just as enjoyable now as a 25 year old as when it was released in 2003.  Perhaps I've since forgotten, but the sight of Jack Black and his cherry red Gibson SG400 made me reminisce on my early days learning the guitar and how it must have been a very strong influence for my first electric guitar.  Given I was still fiddling with bits of MATLAB code as I watched, the below GIF seems a fitting end to Sunday's mini-blog.

<img src="/assets/img/2021-11-21/school-of-rock.gif" width="100%"/>

## Day 6 / Monday
it was a slow morning and I struggled to concentrate to begin with, which might have something to do with another late night before as I waited to hear that Faye had got back safely from Kendal.  Yesterday evening I had heard from Reza, already at Neumayer, that he was having some issues with the ApRES and I set up the HF unit I have with me in the hotel room to perform some firmware tests and check everything was working okay.

![Temporary ApRES radar laboratory in the hotel room](/assets/img/2021-11-22/laptop-lab.jpg)

I am powering the radar from a 12V battery, hidden from view in the photo behind the lid of the Peli case.  There are various ways to connect to the ApRES - USB and RS232/Serial for programming or Ethernet for use in the radar's "attended mode".  You can read more about the ApRES in either [this paper](https://ieeexplore.ieee.org/document/6905935) on its design or [this one](https://www.cambridge.org/core/journals/journal-of-glaciology/article/groundbased-radar-for-measuring-vertical-strain-rates-and-timevarying-basal-melt-rates-in-ice-sheets-and-shelves/B952737EB6DDB3D129DF12FC206DC3EB) on its use as an instrument in glaciology.

![Kitesurfer](/assets/img/2021-11-22/kitesurfer.jpg)

I would like to try and finish the GUI for operating the ApRES over the [experimental HTTP API](http://github.com/jonodhawkins/apreshttp) this week, so this afternoon I worked on Python code to read and interpret the output `*.dat` files.  Dinner was relatively light this evening - I enjoyed the calamari and salad but was also glad to have held back a bread roll from breakfast to have with it! 
