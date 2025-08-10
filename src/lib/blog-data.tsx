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
];
