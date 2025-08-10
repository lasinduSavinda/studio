export type BlogPost = {
  slug: string;
  title: string;
  publishDate: string;
  summary: React.ReactNode;
  content: React.ReactNode;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'understanding-your-menstrual-cycle',
    title: 'Understanding Your Menstrual Cycle',
    publishDate: 'August 1, 2024',
    summary: (
      <p>
        The menstrual cycle is more than just your period. It's a complex and powerful process your body goes through each month, driven by fluctuating hormones. Understanding its different phases can empower you...
      </p>
    ),
    content: (
      <div className="space-y-4 text-base md:text-lg text-muted-foreground">
        <p>
          The menstrual cycle is more than just your period. It's a complex and powerful process your body goes through each month, driven by fluctuating hormones. Understanding its different phases can empower you to take better care of your health, anticipate changes in your energy and mood, and recognize what's normal for you.
        </p>
        <p>
          A full cycle is measured from the first day of one period to the first day of the next. While the average cycle is 28 days, it's perfectly normal for it to range anywhere from 21 to 35 days. Let's walk through the four main phases.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">1. The Menstrual Phase (Your Period)</h3>
        <p>
          This is Day 1 of your cycle. It starts when an egg from the previous cycle wasn't fertilized. Because pregnancy hasn't occurred, levels of the hormones estrogen and progesterone drop. The thickened lining of your uterus, which was prepared to support a pregnancy, is no longer needed, so it sheds. This shedding is what causes the bleeding you experience during your period.
        </p>
        <p>
          During this time, you might experience symptoms like cramps, bloating, headaches, and fatigue. This phase typically lasts 3 to 7 days.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">2. The Follicular Phase</h3>
        <p>
          This phase starts on the first day of your period (so it overlaps with the menstrual phase) and ends when you ovulate. Your pituitary gland releases Follicle Stimulating Hormone (FSH), which stimulates your ovaries to produce several small sacs called follicles. Each follicle contains an immature egg.
        </p>
        <p>
          Eventually, one follicle becomes dominant and continues to mature. The other follicles are reabsorbed by the body. The maturing follicle causes a rise in estrogen, which thickens the lining of your uterus again, creating a nutrient-rich environment for an embryo to grow.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">3. The Ovulation Phase</h3>
        <p>
          The rise in estrogen from the follicular phase triggers your pituitary gland to release Luteinizing Hormone (LH). This is what starts the process of ovulation.
        </p>
        <p>
          Ovulation is when your ovary releases a mature egg. The egg travels down the fallopian tube toward the uterus to be fertilized by sperm. This is the only time during your cycle you can get pregnant. The egg survives for about 12 to 24 hours. Ovulation usually happens around day 14 in a 28-day cycle, but the exact day can vary.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">4. The Luteal Phase</h3>
        <p>
          After the follicle releases its egg, it changes into what is called the corpus luteum. This structure releases hormones, particularly progesterone and some estrogen. These hormones keep your uterine lining thick and ready for a fertilized egg to implant.
        </p>
        <p>
          If you do get pregnant, your body will produce human chorionic gonadotropin (hCG), which helps maintain the corpus luteum and keeps the uterine lining thick. If you don't get pregnant, the corpus luteum will shrink and be reabsorbed. This leads to decreased levels of estrogen and progesterone, which causes your period to start, and the cycle begins all over again. This phase is when many people experience PMS symptoms like mood swings, bloating, and acne.
        </p>
      </div>
    ),
  },
  {
    slug: 'tips-for-managing-pms-symptoms',
    title: 'Tips for Managing PMS Symptoms',
    publishDate: 'July 25, 2024',
    summary: (
      <p>
        Premenstrual Syndrome (PMS) can bring a range of physical and emotional symptoms. From diet changes to gentle exercise, there are many ways to find relief. Here are some tips to help you manage...
      </p>
    ),
    content: (
        <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
                Premenstrual Syndrome (PMS) can bring a range of physical and emotional symptoms, but the good news is that many lifestyle adjustments can help you find significant relief. Here are some effective tips to manage common PMS symptoms.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">1. Adjust Your Diet</h3>
            <p>
                What you eat can have a big impact on PMS. Try to focus on a balanced diet throughout the month, and pay special attention in the week or two before your period.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Reduce Salt and Sugar:</strong> High salt intake can worsen bloating and water retention. Sugary foods can cause blood sugar swings, which may affect your mood and energy levels.</li>
                <li><strong>Eat Complex Carbs:</strong> Choose whole grains, vegetables, and fruits. These provide a steady supply of energy and can help stabilize mood.</li>
                <li><strong>Stay Hydrated:</strong> Drinking plenty of water can actually help reduce bloating and improve digestion.</li>
                <li><strong>Limit Caffeine and Alcohol:</strong> Both can contribute to irritability, anxiety, and breast tenderness in some people.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">2. Get Moving</h3>
            <p>
                Regular physical activity is a powerful mood booster and can help with physical symptoms.
            </p>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Aerobic Exercise:</strong> Activities like brisk walking, jogging, swimming, or cycling can help fight fatigue and depression.</li>
                <li><strong>Stretching and Yoga:</strong> Gentle stretching or yoga can help relieve cramps and muscle tension.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">3. Prioritize Sleep</h3>
            <p>
                Hormonal fluctuations can disrupt sleep patterns. Aim for 7-9 hours of quality sleep per night. A consistent sleep schedule, even on weekends, can make a big difference. Create a relaxing bedtime routine to help you wind down.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">4. Manage Stress</h3>
            <p>
                Stress can make PMS symptoms worse. Find healthy ways to cope with stress.
            </p>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Mindfulness and Meditation:</strong> These practices can help calm your mind and reduce feelings of anxiety and irritability.</li>
                <li><strong>Deep Breathing Exercises:</strong> When you feel overwhelmed, take a few minutes for slow, deep breaths to activate your body's relaxation response.</li>
                <li><strong>Journaling:</strong> Writing down your thoughts and feelings can be a great outlet.</li>
            </ul>
        </div>
    ),
  },
  {
    slug: 'the-importance-of-tracking-your-cycle',
    title: 'The Importance of Tracking Your Cycle',
    publishDate: 'July 18, 2024',
    summary: (
      <p>
        Tracking your menstrual cycle is a powerful tool for self-awareness. It can help you identify patterns, predict your period, and even detect potential health issues early on. Learn why it's a habit worth starting...
      </p>
    ),
    content: (
        <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
                Tracking your menstrual cycle is one of the most proactive steps you can take for your health. It’s more than just knowing when to expect your next period; it’s about understanding your body’s unique rhythm. Here’s why it’s a habit worth starting.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">1. Predict Your Period and Fertile Window</h3>
            <p>
                The most obvious benefit is predictability. Knowing when your period is likely to start helps you feel prepared. Furthermore, tracking helps you identify your fertile window—the days in your cycle when you are most likely to get pregnant. This is crucial information whether you are trying to conceive or trying to avoid pregnancy.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">2. Understand Your Body's Patterns</h3>
            <p>
                Do you get headaches around the same time each month? Do you feel more energetic or more irritable during certain weeks? By logging symptoms like mood swings, cramps, bloating, and energy levels, you can start to see patterns. This self-awareness allows you to anticipate these changes and plan accordingly, whether it’s scheduling a tough workout during a high-energy phase or planning for more rest when you know you’ll be fatigued.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">3. Detect Potential Health Issues Early</h3>
            <p>
                Your menstrual cycle is a key indicator of your overall health. Significant changes in your cycle—like irregular periods, unusually heavy bleeding, or severe pain—can be early signs of underlying health conditions such as Polycystic Ovary Syndrome (PCOS), thyroid issues, or fibroids. Having a detailed record of your cycle makes it easier for you and your healthcare provider to spot irregularities and address them promptly.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">4. Have More Informed Conversations with Your Doctor</h3>
            <p>
                When you visit a doctor or gynecologist, they will almost always ask about your last menstrual period. Being able to provide detailed information about your cycle length, period duration, and any symptoms you’re experiencing can lead to a more accurate diagnosis and better care. With a tracker, you have concrete data to share, which is far more reliable than memory alone.
            </p>
        </div>
    ),
  },
  {
    slug: 'eating-for-a-healthier-cycle',
    title: 'Eating for a Healthier Cycle: Foods to Embrace and Avoid',
    publishDate: 'August 8, 2024',
    summary: (
      <p>
        Nutrition plays a vital role in hormonal balance and can significantly impact how you feel throughout your menstrual cycle. By choosing the right foods, you can alleviate common symptoms like cramping, bloating, and mood swings.
      </p>
    ),
    content: (
        <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
                Nutrition plays a vital role in hormonal balance and can significantly impact how you feel throughout your menstrual cycle. By choosing the right foods during each phase, you can work with your body to alleviate common symptoms and boost your overall well-being.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">During Your Period (Menstrual Phase)</h3>
            <p>
                Your body is working hard and losing iron. Focus on nourishing, warming, and iron-rich foods.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Foods to Embrace:</strong> Leafy greens (spinach, kale), lean red meat, lentils, beans, and vitamin C-rich foods like citrus fruits and bell peppers to help with iron absorption. Ginger and turmeric tea can help ease cramps.</li>
                <li><strong>Foods to Limit:</strong> Heavy, greasy foods, excessive caffeine, and alcohol, as they can worsen inflammation and cramping.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Before Ovulation (Follicular Phase)</h3>
            <p>
                As estrogen levels rise, your energy starts to return. Focus on light, fresh foods that support follicle development.
            </p>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Foods to Embrace:</strong> Lean proteins (chicken, fish), whole grains (oats, quinoa), avocados, nuts, and seeds. Cruciferous vegetables like broccoli and cauliflower can help metabolize estrogen.</li>
                <li><strong>Foods to Limit:</strong> Continue to keep alcohol intake low as it can interfere with hormonal balance.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Around Ovulation</h3>
            <p>
                Your energy is at its peak! You need plenty of fiber and antioxidants to support the liver in processing hormones.
            </p>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Foods to Embrace:</strong> Lots of fruits and vegetables, especially those high in antioxidants like berries. Continue with light proteins and complex carbs.</li>
                 <li><strong>Foods to Limit:</strong> Highly processed or fried foods that can cause inflammation.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Before Your Period (Luteal Phase)</h3>
            <p>
                This is when PMS symptoms can kick in as progesterone rises and then falls. Focus on foods that stabilize blood sugar and mood.
            </p>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Foods to Embrace:</strong> Complex carbohydrates like sweet potatoes and brown rice to combat cravings. Magnesium-rich foods like dark chocolate, nuts, and seeds can help with mood and sleep. Calcium from yogurt or leafy greens may reduce physical PMS symptoms.</li>
                <li><strong>Foods to Limit:</strong> Salty foods that contribute to bloating and sugary snacks that lead to energy crashes. Be mindful of caffeine, which can increase anxiety.</li>
            </ul>
        </div>
    ),
  },
  {
    slug: 'exercise-and-your-menstrual-cycle',
    title: 'Exercise and Your Menstrual Cycle: How to Sync Your Workouts',
    publishDate: 'August 15, 2024',
    summary: (
      <p>
        Syncing your workouts with the phases of your menstrual cycle can help you maximize your fitness goals, boost energy, and reduce discomfort. Learn how to tailor your exercise routine to your body's natural rhythm.
      </p>
    ),
    content: (
        <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
                Have you ever noticed that some weeks you feel like you can conquer any workout, while other weeks just getting to the gym feels like a marathon? This isn't just in your head—it's likely linked to the hormonal fluctuations of your menstrual cycle. Syncing your exercise routine to your cycle can help you work with your body, not against it.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Phase 1: Menstrual Phase (Days 1-7)</h3>
            <p>
                Your energy levels are typically at their lowest during your period. This is a time for rest and recovery.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Best Workouts:</strong> Gentle movement is key. Think restorative yoga, light walking, stretching, and Pilates. If you feel up to it, light cardio can help ease cramps.</li>
                <li><strong>Listen to Your Body:</strong> Don't push yourself. If you're feeling fatigued or crampy, it's okay to take a day off.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Phase 2: Follicular Phase (Days 1-13)</h3>
            <p>
                As your period ends, estrogen and energy levels begin to rise. This is the perfect time to challenge yourself with more intense workouts.
            </p>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Best Workouts:</strong> Your body is primed for high-intensity interval training (HIIT), running, dancing, and strength training. You may find you can lift heavier and push harder during this phase.</li>
                <li><strong>Try Something New:</strong> With your energy and motivation on the upswing, this is a great time to try a new fitness class or activity.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Phase 3: Ovulation Phase (Around Day 14)</h3>
            <p>
                Your energy and strength are at their peak, thanks to high levels of estrogen and testosterone. This is when you're likely to perform your best.
            </p>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Best Workouts:</strong> Go for personal records! This is the ideal time for heavy strength training, powerlifting, sprinting, and intense cardio sessions.</li>
                <li><strong>Be Mindful of Injury:</strong> Some studies suggest a higher risk of injury around ovulation, so make sure your form is solid and you warm up properly.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Phase 4: Luteal Phase (Days 15-28)</h3>
            <p>
                After ovulation, your energy may start to decline as progesterone rises. In the latter half of this phase, you might experience PMS symptoms.
            </p>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Best Workouts:</strong> In the early luteal phase, you might still feel strong enough for moderately intense workouts. As you get closer to your period, shift towards lower-impact activities like swimming, cycling, yoga, and steady-state cardio.</li>
                <li><strong>Focus on Form:</strong> As fatigue sets in, it's better to focus on maintaining good technique rather than pushing for intensity.</li>
            </ul>
        </div>
    ),
  },
  {
    slug: 'period-and-mental-health',
    title: 'Your Period and Mental Health: What\'s the Connection?',
    publishDate: 'August 22, 2024',
    summary: (
      <p>
        The hormonal shifts of the menstrual cycle don't just affect the body; they can have a profound impact on mental and emotional well-being. Understanding this connection is the first step toward managing it.
      </p>
    ),
    content: (
        <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
                The link between hormonal fluctuations and mental health is powerful. For many people, the menstrual cycle brings not just physical symptoms, but also significant emotional shifts. If you've ever felt more anxious, irritable, or down in the days leading up to your period, you're not alone.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">The Hormonal Rollercoaster</h3>
            <p>
                The key players are estrogen and progesterone. These hormones don't just regulate your cycle; they also influence neurotransmitters in your brain, like serotonin (the "feel-good" chemical) and dopamine.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Mid-Cycle High:</strong> Around ovulation, high estrogen levels can boost your mood and energy.</li>
                <li><strong>Pre-Period Low (Luteal Phase):</strong> In the week or two before your period, estrogen and progesterone levels plummet. This drop can lead to a decrease in serotonin, contributing to the classic PMS symptoms of sadness, irritability, and anxiety.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">PMS vs. PMDD</h3>
            <p>
                While many experience mild to moderate PMS, some face a more severe condition called Premenstrual Dysphoric Disorder (PMDD). PMDD is a serious health condition that can cause extreme mood shifts, depression, and anger that interfere with daily life. It's more than just "bad PMS" and often requires treatment from a healthcare provider.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Strategies for Emotional Wellness</h3>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Track Your Mood:</strong> Use your period tracker to log how you're feeling each day. Identifying a pattern can be validating and help you prepare for challenging days.</li>
                <li><strong>Prioritize Self-Care:</strong> During the luteal phase, be extra kind to yourself. This could mean gentle exercise, meditation, spending time in nature, or setting aside time for hobbies you enjoy.</li>
                <li><strong>Talk About It:</strong> Share how you're feeling with a trusted friend, partner, or therapist. Feeling understood can make a huge difference.</li>
                <li><strong>Seek Professional Help:</strong> If your mood symptoms are severe or disruptive, don't hesitate to speak with a doctor or mental health professional. There are many effective treatments available.</li>
            </ul>
        </div>
    ),
  },
   {
    slug: 'decoding-period-blood-color',
    title: 'Decoding Your Period Blood Color: What It Means',
    publishDate: 'August 29, 2024',
    summary: (
      <p>
        The color and consistency of your menstrual blood can change throughout your period and from cycle to cycle. While usually not a cause for alarm, it can offer clues about your hormonal health.
      </p>
    ),
    content: (
        <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
               Paying attention to the color of your period blood might not be your favorite activity, but it can provide useful insights into your health. The color is primarily influenced by how long the blood has been in the uterus and exposed to oxygen.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Bright Red</h3>
            <p>
               This is typically a sign of fresh, steady flow. It's common to see bright red blood at the beginning and middle of your period when bleeding is heaviest. It means blood is flowing quickly from the uterus and doesn't have time to oxidize and darken.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Dark Red or Brown</h3>
            <p>
                Dark red, brown, or even black blood is usually just older blood. It's had more time to oxidize, which is what makes it change color. You'll often see this at the very beginning or end of your period when the flow is lighter and slower. It can also be from leftover blood from your previous cycle.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Pink</h3>
            <p>
                Pinkish blood often occurs when period blood mixes with cervical fluid. It's common at the beginning or end of your period. It can also be a sign of low estrogen levels. Sometimes, people experience light pink spotting mid-cycle during ovulation.
            </p>

             <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Orange</h3>
            <p>
                Similar to pink blood, orange discharge can also happen when blood mixes with cervical fluid. However, if it's accompanied by a bad odor or itching, it could be a sign of an infection, like bacterial vaginosis or trichomoniasis, and it's a good idea to see a doctor.
            </p>
            
             <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Gray</h3>
            <p>
                Gray discharge is a reason to call your doctor. It's often a symptom of bacterial vaginosis (BV), an infection caused by an imbalance in the natural bacteria of the vagina. Other signs of BV include itching, a foul or fishy odor, and irritation.
            </p>
            <p>
                Remember, your period can vary. But if you notice a major, persistent change in color, flow, or experience symptoms like a foul odor or severe pain, it's always best to check in with a healthcare provider.
            </p>
        </div>
    ),
  },
  {
    slug: 'how-hormones-affect-skin',
    title: 'How Hormones Affect Your Skin Throughout Your Cycle',
    publishDate: 'September 5, 2024',
    summary: (
      <p>
        Ever wonder why you get breakouts right before your period or why your skin glows mid-cycle? It's all connected to the hormonal fluctuations of your menstrual cycle. Here's a look at what's happening.
      </p>
    ),
    content: (
        <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
                Your skin is one of the most visible indicators of what's happening inside your body, and your menstrual cycle plays a huge role. The rise and fall of hormones like estrogen, progesterone, and testosterone can directly impact your skin's oil production, hydration, and overall appearance.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">During Your Period (Menstrual Phase)</h3>
            <p>
                At the start of your cycle, both estrogen and progesterone are low. This can cause your skin to feel dry, dull, and more sensitive. Your body also produces more prostaglandins, which can increase inflammation and make your skin feel more reactive.
            </p>
            <p><strong>Skincare Tip:</strong> Focus on hydration and gentle, soothing ingredients. Use a rich moisturizer and avoid harsh exfoliants or new products that could cause irritation.</p>
            

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Leading Up to Ovulation (Follicular Phase)</h3>
            <p>
                As your period ends, estrogen starts to rise. Estrogen promotes collagen production, improves skin thickness, and helps your skin retain moisture. This is when your skin is often at its best—plump, hydrated, and clear. You might notice that "ovulation glow."
            </p>
            <p><strong>Skincare Tip:</strong> This is a great time for exfoliation to maintain that glow. Your skin is more resilient, so you can incorporate active ingredients like retinoids or vitamin C.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">After Ovulation (Luteal Phase)</h3>
            <p>
                This is where things can get tricky. After ovulation, progesterone levels rise. Progesterone can cause the skin to swell and compress pores. At the same time, this hormone increases sebum (oil) production. This combination of tight pores and excess oil creates the perfect environment for bacteria to get trapped, leading to those classic premenstrual breakouts, especially around the chin and jawline.
            </p>
            <p><strong>Skincare Tip:</strong> Focus on keeping pores clear. Use a gentle cleanser and consider incorporating products with salicylic acid (a BHA) to exfoliate inside the pores and reduce oiliness. Clay masks can also be helpful for absorbing excess sebum.</p>
        </div>
    ),
  },
   {
    slug: 'debunking-common-period-myths',
    title: 'Debunking Common Period Myths',
    publishDate: 'September 12, 2024',
    summary: (
      <p>
        From swimming on your period to syncing cycles with your friends, there's a lot of misinformation out there. Let's separate fact from fiction and debunk some of the most common period myths.
      </p>
    ),
    content: (
        <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
                For something that about half the world's population experiences, periods are still surrounded by a surprising amount of mystery and misinformation. Let's clear up some of the most common myths.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Myth 1: You Can't Get Pregnant on Your Period</h3>
            <p>
                <strong>Fact:</strong> While it's less likely, it is absolutely possible to get pregnant while you're on your period. Sperm can live inside the female reproductive tract for up to five days. If you have a shorter cycle and have sex near the end of your period, the sperm could still be present when you ovulate shortly after.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Myth 2: You Shouldn't Swim or Take a Bath on Your Period</h3>
            <p>
                <strong>Fact:</strong> This is an old myth with no scientific basis. It is perfectly hygienic and safe to swim or bathe during your period. Water pressure can temporarily lighten or stop your flow anyway. If you're concerned, you can use a tampon or menstrual cup. In fact, a warm bath can be great for soothing cramps.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Myth 3: Periods Should Last Exactly 7 Days and Come Every 28 Days</h3>
             <p>
                <strong>Fact:</strong> The "28-day cycle" is just an average. A normal, healthy cycle can range from 21 to 35 days, and a period can last anywhere from 3 to 7 days. What's most important is that your cycle is consistent and regular *for you*.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Myth 4: Your Cycle Syncs Up with People You Spend a Lot of Time With</h3>
            <p>
                <strong>Fact:</strong> This is a widely believed phenomenon, but scientific studies have found no evidence to support it. While it might seem like your cycle aligns with a friend, roommate, or family member, it's more likely due to mathematical coincidence and chance. Over time, cycles of different lengths are bound to overlap occasionally.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Myth 5: PMS is "All in Your Head"</h3>
            <p>
                <strong>Fact:</strong> Premenstrual Syndrome is a very real condition with documented physical and emotional symptoms caused by hormonal fluctuations. The drop in estrogen and progesterone before your period can affect neurotransmitters in your brain, leading to real changes in mood and physical discomfort.
            </p>
        </div>
    ),
  },
  {
    slug: 'navigating-perimenopause',
    title: 'Navigating Perimenopause: Signs and Symptom Management',
    publishDate: 'September 19, 2024',
    summary: (
      <p>
        Perimenopause is the transitional stage before menopause, and it can bring a host of changes to your cycle and body. Knowing the signs can help you navigate this new phase with confidence.
      </p>
    ),
    content: (
        <div className="space-y-4 text-base md:text-lg text-muted-foreground">
            <p>
                Perimenopause, which means "around menopause," is the transitional period before a person's periods stop for good. It can start in your 40s, but for some, it begins in their 30s. During this time, the ovaries begin to produce less estrogen, leading to a variety of changes. It's a natural life stage, but it can be confusing. Here's what to look for.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Common Signs of Perimenopause</h3>
            <p>
                Because of the fluctuating hormone levels, you may start to experience a new set of symptoms.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Irregular Periods:</strong> This is often the first sign. Your cycle length may become longer or shorter. You might have heavier or lighter flows, or you might skip some periods altogether. Tracking your cycle becomes incredibly helpful here to notice these changes.</li>
                <li><strong>Hot Flashes and Night Sweats:</strong> The classic menopause symptom. A hot flash is a sudden feeling of warmth that spreads through the body, often causing flushing and sweating.</li>
                <li><strong>Sleep Problems:</strong> Trouble sleeping can be caused by night sweats, but it can also be a symptom on its own.</li>
                <li><strong>Mood Changes:</strong> Increased irritability, anxiety, or feelings of depression are common, much like a more intense version of PMS.</li>
                 <li><strong>Vaginal Dryness:</strong> Lower estrogen can lead to tissues becoming thinner and less lubricated, which can make intercourse uncomfortable.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">Managing Symptoms</h3>
            <p>
                While you can't stop perimenopause, you can manage the symptoms through lifestyle adjustments and medical support.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Lifestyle First:</strong> A balanced diet, regular exercise (especially weight-bearing exercise for bone health), and stress management techniques like meditation are your first line of defense.</li>
                <li><strong>Dress in Layers:</strong> This can help you manage hot flashes by easily removing clothing when you feel one coming on.</li>
                <li><strong>Talk to Your Doctor:</strong> Don't hesitate to seek medical advice. Your doctor can discuss options ranging from low-dose birth control pills to regulate cycles, to hormone replacement therapy (HRT) if symptoms are severe.</li>
            </ul>
             <p>
                You officially reach menopause when you've gone 12 consecutive months without a period. Perimenopause is the journey to that destination, and while it has its challenges, understanding what's happening can empower you to take control of your health.
            </p>
        </div>
    ),
  },
];
