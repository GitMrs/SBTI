import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, RefreshCw, Share2, Skull, Zap, X, Copy, Check } from 'lucide-react';

type AppState = 'home' | 'quiz' | 'loading' | 'result';

const QUESTIONS = [
  {
    id: 1,
    text: "早上闹钟响了，你的第一反应是？",
    options: [
      { text: "直接按掉，再睡500年", trait: "DEAD" },
      { text: "垂死病中惊坐起，打工魂燃烧", trait: "POOR" },
      { text: "阿弥陀佛，一切皆空", trait: "MONK" },
      { text: "发出一声猴叫", trait: "MALOU" }
    ]
  },
  {
    id: 2,
    text: "面对领导画的大饼，你的内心OS：",
    options: [
      { text: "表面点头，内心F**K", trait: "FUCK" },
      { text: "吃吃吃，我全吃进去", trait: "FAKE" },
      { text: "关我屁事，到点下班", trait: "DEAD" },
      { text: "只要钱到位，饼也能当饭", trait: "POOR" }
    ]
  },
  {
    id: 3,
    text: "周末朋友叫你出去玩，你通常：",
    options: [
      { text: "已读不回，假装没看见", trait: "DEAD" },
      { text: "去哪？谁请客？", trait: "POOR" },
      { text: "随缘，去不去都行", trait: "MONK" },
      { text: "好耶！立刻化身精神小伙/小妹", trait: "MALOU" }
    ]
  },
  {
    id: 4,
    text: "遇到傻X客户/同事时：",
    options: [
      { text: "在心里已经把他千刀万剐", trait: "FUCK" },
      { text: "保持职业假笑：好的呢亲", trait: "FAKE" },
      { text: "放下助人情结，尊重他人命运", trait: "MONK" },
      { text: "直接发疯，创死所有人", trait: "MALOU" }
    ]
  },
  {
    id: 5,
    text: "发了工资的第一件事是？",
    options: [
      { text: "马上还花呗/信用卡，瞬间清零", trait: "LEEK" },
      { text: "疯狂购物犒劳自己，然后继续吃土", trait: "CLOWN" },
      { text: "默默存起来，看着数字傻笑", trait: "NIUMA" },
      { text: "点个平时舍不得吃的豪华外卖", trait: "SALT" }
    ]
  },
  {
    id: 6,
    text: "遇到困难时的解决方式：",
    options: [
      { text: "只要我躺得够平，困难就找不到我", trait: "SALT" },
      { text: "疯狂内耗，半夜流泪", trait: "CLOWN" },
      { text: "习惯了，直接麻木地开始干活", trait: "NIUMA" },
      { text: "逃避可耻但有用，先鸽了再说", trait: "PIGEON" }
    ]
  }
];

const RESULTS = [
  { id: "MONK", title: "僧人 (MONK)", desc: "没有那种世俗的欲望", detail: "你已经看透了红尘，对打工、恋爱、暴富都失去了世俗的欲望。你的精神状态领先人类五百年，阿弥陀佛，善哉善哉。", color: "bg-stone-300 text-black" },
  { id: "DEAD", title: "死者 (DEAD)", desc: "一具会打字的尸体", detail: "虽然你还在呼吸，但你的灵魂已经在周一早上死去了。你每天的日常就是行尸走肉般地完成任务，唯一的愿望是永远躺平。", color: "bg-zinc-800 text-white" },
  { id: "FUCK", title: "草者 (FUCK)", desc: "一种植物，也是一种态度", detail: "你的内心充满了对这个世界的优美中国话。虽然表面上你可能还在维持体面，但你的精神状态已经是一片茂盛的大草原。", color: "bg-green-400 text-black" },
  { id: "FAKE", title: "伪人 (FAKE)", desc: "熟练掌握人类伪装技巧", detail: "你是一个完美的社会变色龙。在老板面前是奋斗逼，在父母面前是乖宝宝，但真实的你到底是谁？可能连你自己都忘了。", color: "bg-purple-400 text-black" },
  { id: "POOR", title: "贫穷者 (POOR)", desc: "除了穷，什么都有", detail: "你的钱包比你的脸还干净。你对金钱的渴望超越了一切，但很遗憾，财神爷似乎把你拉黑了。每天都在为五斗米折腰。", color: "bg-yellow-400 text-black" },
  { id: "MALOU", title: "吗喽 (MALOU)", desc: "吗喽的命也是命", detail: "你是一只快乐又悲伤的吗喽。每天在钢铁丛林里上蹿下跳，偶尔发疯，偶尔emo。虽然生活很苦，但你总能找到香蕉。", color: "bg-orange-400 text-black" },
  { id: "NIUMA", title: "牛马 (NIUMA)", desc: "天生打工圣体", detail: "你对老板的PUA已经完全免疫，因为你接受了自己是牛马的设定。只要还有一口气，你就能继续拉磨，堪称感动中国好员工。", color: "bg-amber-700 text-white" },
  { id: "CLOWN", title: "小丑 (CLOWN)", desc: "哥谭市在逃常驻居民", detail: "每天都在为了迎合别人而努力表演，最后发现小丑竟然是自己。你的面具焊得太死，连自己都摘不下来了。", color: "bg-red-500 text-white" },
  { id: "PIGEON", title: "鸽王 (PIGEON)", desc: "人类放鸽子精华", detail: "你的口头禅是“下次一定”。只要不到最后一刻，你永远在拖延。你的本体其实是一只咕咕叫的鸽子，主打一个随心所欲。", color: "bg-sky-200 text-black" },
  { id: "LEEK", title: "韭菜 (LEEK)", desc: "绿油油的待割植物", detail: "无论是股市、基金还是消费主义陷阱，你总是精准踩雷。你不是在被割，就是在被割的路上，生生不息，春风吹又生。", color: "bg-emerald-500 text-white" },
  { id: "SALT", title: "咸鱼 (SALT)", desc: "翻个面继续粘锅", detail: "你的梦想就是没有梦想。只要能躺着绝不坐着，只要能摆烂绝不努力。你的含盐量已经严重超标，彻底腌入味了。", color: "bg-cyan-200 text-black" }
];

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<typeof RESULTS[0] | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleStart = () => {
    setAppState('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleAnswer = (trait: string) => {
    const newAnswers = [...answers, trait];
    setAnswers(newAnswers);
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    setAppState('loading');
    
    setTimeout(() => {
      const counts = finalAnswers.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      let maxTrait = finalAnswers[0];
      let maxCount = 0;
      for (const [trait, count] of Object.entries(counts)) {
        if (count > maxCount) {
          maxCount = count;
          maxTrait = trait;
        }
      }
      
      // 30% chance of complete randomness to match the "unstable" nature of SBTI
      if (Math.random() > 0.7) {
        maxTrait = RESULTS[Math.floor(Math.random() * RESULTS.length)].id;
      }

      const finalResult = RESULTS.find(r => r.id === maxTrait) || RESULTS[0];
      setResult(finalResult);
      setAppState('result');
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Marquee Background Elements */}
      <div className="fixed top-20 left-0 w-full -rotate-3 z-0 opacity-80 pointer-events-none">
        <div className="marquee-container bg-yellow-300">
          <div className="marquee-content">
            SBTI 人格测试 • 测测你的精神状态 • SBTI 人格测试 • 测测你的精神状态 • SBTI 人格测试 • 测测你的精神状态 • 
          </div>
        </div>
      </div>
      <div className="fixed bottom-32 left-0 w-full rotate-6 z-0 opacity-80 pointer-events-none">
        <div className="marquee-container bg-pink-400 text-white">
          <div className="marquee-content">
            拒绝内耗 • 发疯日常 • 拒绝内耗 • 发疯日常 • 拒绝内耗 • 发疯日常 • 拒绝内耗 • 发疯日常 • 
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {appState === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="bg-white brutal-box-static p-8 flex flex-col items-center text-center"
            >
              <div className="bg-black text-white px-4 py-1 font-bold tracking-widest uppercase mb-6 transform -skew-x-12">
                2026 全网爆款
              </div>
              <h1 className="text-7xl font-black mb-2 tracking-tighter font-display leading-none">
                SBTI
              </h1>
              <h2 className="text-3xl font-black mb-6 tracking-tight">
                人格测试
              </h2>
              <p className="text-gray-800 font-bold mb-8 border-t-4 border-b-4 border-black py-4">
                传统MBTI太正经？<br/>
                来测测你真实的「精神状态」<br/>
                <span className="text-xs text-gray-500 mt-2 block font-normal">*本测试毫无科学依据，纯属发疯</span>
              </p>
              <button
                onClick={handleStart}
                className="brutal-box bg-cyan-400 w-full py-4 text-xl font-black flex items-center justify-center gap-2 hover:bg-cyan-300"
              >
                开始发疯 <Zap className="w-6 h-6 fill-black" />
              </button>
            </motion.div>
          )}

          {appState === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full"
            >
              <div className="bg-white brutal-box-static p-6 mb-6">
                <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2">
                  <span className="font-black text-2xl font-display">Q{currentQuestion + 1}</span>
                  <span className="font-bold text-gray-500">{currentQuestion + 1} / {QUESTIONS.length}</span>
                </div>
                <h2 className="text-2xl font-black leading-tight mb-2">
                  {QUESTIONS[currentQuestion].text}
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {QUESTIONS[currentQuestion].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleAnswer(option.trait)}
                    className="brutal-box bg-white hover:bg-yellow-300 p-4 text-left font-bold text-lg flex items-center justify-between group"
                  >
                    <span>{option.text}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {appState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="bg-white brutal-box-static p-12 flex flex-col items-center text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="mb-6"
              >
                <RefreshCw className="w-16 h-16" />
              </motion.div>
              <h2 className="text-3xl font-black animate-pulse font-display">
                正在分析脑电波...
              </h2>
              <p className="mt-4 font-bold text-gray-500 bg-gray-100 px-4 py-2 border-2 border-black">
                （其实就是在瞎编）
              </p>
            </motion.div>
          )}

          {appState === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className={`brutal-box-static p-6 ${result.color} relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                <Skull className="w-48 h-48" />
              </div>
              
              <div className="relative z-10">
                <div className="bg-black text-white inline-block px-3 py-1 font-bold text-sm mb-4 border-2 border-white">
                  你的SBTI人格是
                </div>
                <h1 className="text-6xl font-black mb-2 font-display tracking-tight">
                  {result.title}
                </h1>
                <h2 className="text-2xl font-bold mb-6 border-b-4 border-current pb-4">
                  "{result.desc}"
                </h2>
                
                <div className="bg-white brutal-box-static p-5 mb-8 text-black">
                  <p className="font-bold text-lg leading-relaxed">
                    {result.detail}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleShare}
                    className="brutal-box bg-black text-white w-full py-4 font-black flex items-center justify-center gap-2 hover:bg-gray-800 text-lg"
                  >
                    炫耀我的精神状态 <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleStart}
                    className="brutal-box bg-white text-black w-full py-4 font-black flex items-center justify-center gap-2 hover:bg-gray-100 text-lg"
                  >
                    再测一次 (可能会变) <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 20, rotate: 2 }}
              className="w-full max-w-sm flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Poster Card */}
              <div className={`brutal-box-static p-6 ${result.color} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                  <Skull className="w-48 h-48" />
                </div>
                
                <div className="relative z-10">
                  <div className="bg-black text-white inline-block px-3 py-1 font-bold text-sm mb-4 border-2 border-white">
                    SBTI 精神状态鉴定报告
                  </div>
                  <h1 className="text-5xl font-black mb-2 font-display tracking-tight">
                    {result.title}
                  </h1>
                  <h2 className="text-xl font-bold mb-6 border-b-4 border-current pb-4">
                    "{result.desc}"
                  </h2>
                  
                  <div className="bg-white brutal-box-static p-4 mb-6 text-black">
                    <p className="font-bold text-sm leading-relaxed">
                      {result.detail}
                    </p>
                  </div>

                  <div className="flex justify-between items-end border-t-4 border-current pt-4">
                    <div className="font-black font-display text-3xl leading-none">
                      SBTI<br/><span className="text-lg">2026</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold bg-white text-black px-2 py-1 brutal-box-static inline-block transform rotate-3">
                        长按或截图保存
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={copyLink}
                  className="brutal-box bg-cyan-400 text-black flex-1 py-3 font-black flex items-center justify-center gap-2 hover:bg-cyan-300"
                >
                  {copied ? <><Check className="w-5 h-5" /> 已复制链接</> : <><Copy className="w-5 h-5" /> 复制测试链接</>}
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="brutal-box bg-white text-black w-14 flex items-center justify-center hover:bg-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
