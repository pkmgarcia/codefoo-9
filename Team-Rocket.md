# How Many Poké Balls Does It Take to Completely Fill the Coit Tower?

## Table of Contents
[Prompt](#prompt)

[Solution](#solution)
1. [Calculating the Volume of a Single Poké Ball](#step1)
2. [Estimating the Total Volume of the Inside of the Coit Tower](#step2)
3. [Applying Sphere Packing Solutions to Solve for the Number of Poké Balls](#step3)

[Conclusion](#conclusion)

[References](#references)

## <span id="prompt">Prompt</span>
> Team Rocket is at it again! This time they are looking to terrorize the city of San Francisco, and aim to make the trek through the “crookedest street in the world” ( Lombard Street ) to steal a treasure contained in Coit Tower. Legend has it, the tower is completely filled with Poké Balls, enough Poké Balls for Team Rocket to amass an army of Pokémon! Fortunately, a slumbering Pokémon is known to sleep at the bottom of Lombard St and block the entrance to Coit Tower entirely. If Team Rocket determines how to wake the sleeping giant and successfully steals the cache of Poké Balls that fills Coit Tower, about how many Poké Balls would they walk away with? Describe each step in your thought process.

**Simply put, how many Poké Balls, *N*, does it take to completely fill the Coit Tower?**

## <span id="solution">Solution</span>
My approach to solving this problem is to:

1. Calculate the volume of a single Poké Ball: *V<sub>PB</sub>*
2. Estimate the total volume of the inside of the Coit Tower: *V<sub>C</sub>*
3. Apply sphere packing solutions to estimate how many Poké Balls can fit in the Coit Tower.

### <span id="step1">1. Calculating the Volume of a Single Poké Ball: *V<sub>PB</sub>*
We all know that when it comes to anime, only canon content matters, but the Poké Ball's metrics are shrouded in mystery. The most canon metric I could find is in the real life product, the Poké Ball Plus.<sup>[1](#fn1)</sup>

Given that the radius of the Poké Ball Plus is about .117*ft*:

*`V`<sub>`PB`</sub>* `= 4/3 * PI * ` `(.117`*`ft`*`)`<sup>`3`</sup> `= .00671`*`ft`*<sup>`3`</sup>

### <span id="step2">2. Estimating the Total Volume of the Inside of the Coit Tower: *V<sub>C</sub>*</span>
Thanks to the floor plan<sup>[2](#fn2)</sup>, we can estimate the total volume of the inside of the Coit Tower by summing up the volume of each floor, which can be calculated by treating each floor as a cylinder.

Given that floors 3 through 10 share the same radius and the Belvedere and Lantern levels cannot be filled with poké balls (they are not enclosed spaces), the measured radius and calculated volumes of each cylinder are:

| Floor | Height (*ft*) | Radius **\*** (*ft*) | Volume (*ft*<sup>*3*</sup>) |
| --- | --- | --- | --- |
| 1 | 15.125 | 32.875 | 51354.296 |
| 2 | 9.25 | 35 | 35598.172 |
| 3 - 10 | 98.729 | 14.12 | 61839.22 |

The total volume of the inside of the Coit Tower is therefore:

*`V`<sub>`C`</sub>* `=` *`V`<sub>`C1`</sub>* `+` *`V`<sub>`C2`</sub>* `+ V`<sub>`C3`</sub> `= 148791.688`*`ft`*<sup>*`3`*</sup>

### <span id="step3">3. Applying Sphere Packing Solutions to Solve for N
Part of figuring out the solution to this problem is figuring out how the poké balls are packed and how their packing affects the total number of poké balls inside the Coit Tower. It is here where I wave my hands and say the magic words, "Thanks for the article, Wikipedia." If we assume that the Coit Tower is densely packed we can expect the volume taken up by the poké balls to be about 74% of the total volume of the Coit Tower.

Given the volumes of the Coit Tower and a single poké ball, and that the Coit Tower is densely packed:

*`N`* `= .74 *` *`V`<sub>`C`</sub> `/ V`<sub>`PB`</sub>* `= 16409217.455 = 16409217`

## <span id="conclusion">Conclusion</span>

**According to my estimation, the Coit Tower should contain about 16,409,217 poké balls**. This was calculated by first finding the Coit Tower's volume, then by finding how much of the Coit Tower's volume would be filled if packed by poké balls, and finally by finding how many poké balls it takes to fill that volume.

It should be said that this is an overestimate and could improve by considering finer details of the Coit Tower. One way to improve the estimation would be to calculate the volume of the Coit Tower's internal structure to obtain a more precise estimate of the Coit Tower's volume. Another way to improve the estimation would be to treat each floor like a polygon instead of a circle, since the Coit Tower is polygonal.

## <span id="references">References</span>
1. <a id="fn1" href="https://www.amazon.com/Pok%C3%A9-Ball-Plus-Switch/dp/B01N5OKM3I">Amazon: Poké Ball Plus</a>

2. <a id="fn2" href="http://mission.sfgov.org/oca_bid_attachments/FA30915.pdf">Coit Tower Floor Plan</a>

3. <a id="fn3" href="https://en.wikipedia.org/wiki/Sphere_packing">"Sphere Packing"