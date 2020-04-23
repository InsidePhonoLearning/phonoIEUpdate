//Software based on Carolyn Anderson's ComicCaption Ibex software.
//Preload images using Alex Drummond's Preloader controller.
//All bugs, errors, and stylistic faux pas can be attributed to Brandon Prickett.

//**************************************
// INITIALIZE VARIABLES AND FUNCTIONS
//***************************************

//Conditions:
var pi_with = "one"; //one or two
var i_or_e = "implicit" //explicit or implicit
var test_run = true; //if true, only a small subset of trials in each phase will be presented
var train_in_block = true; //This needs to be true! If you set it to false, no promises as to how many bugs there are.
    
//Functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
      
//Assign groups to different...groups.
var group_nums = ["g01", "g02", "g03", "g04", "g05", "g06", "g07", "g08", "g09", "g10"];
var word_nums = ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09", "w10"];
var tone_nums = ["t1", "t2", "t3", "t4", "t5"];
shuffle(group_nums)
    
var one_syll_train = [group_nums[0]];
var two_syll_train = [group_nums[1]];
var one_syll_correct_test = [group_nums[2], group_nums[3]];
var two_syll_correct_test = [group_nums[4], group_nums[5]];
var one_syll_wrong_test = [group_nums[6], group_nums[7]];
var two_syll_wrong_test = [group_nums[8], group_nums[9]];  
    
//Deal with token orderings:
if (pi_with == "two"){
    var syll_nums = ["OneKo", "TwoPi"];   
} else {    
    if (pi_with == "one"){var syll_nums = ["OnePi", "TwoKo"];} else {throw "Uh Oh... problem with 'pi_with' condition...";} 
}
all_syll_nums = ["OneKo", "OnePi", "TwoPi", "TwoKo"];

get_t = {};
for (s = 0; s < all_syll_nums.length; s ++){
   for (g = 0; g < group_nums.length; g ++){
      for (w = 0; w < word_nums.length; w ++){
          shuffle(tone_nums);
          get_t[all_syll_nums[s]+"_"+group_nums[g]+"_"+word_nums[w]] = [...tone_nums];
      }     
   }
}

//List of images
var pic_names = [];
var pic_nums = Array.from(Array(20).keys());
for (i = 0; i < pic_nums.length; i ++){
    var this_num = pic_nums[i] + 1;
    pic_names.push(this_num+"")
}
var pic_dir = "https://people.umass.edu/bprickett/Phono_IE_Stimuli/Pictures/";
shuffle(pic_names);
var IMAGES_TO_PRELOAD = [];
for (i = 0; i < pic_names.length; i ++){
    IMAGES_TO_PRELOAD.push(pic_dir.concat(pic_names[i]).concat(".jpg"));
}
shuffle(IMAGES_TO_PRELOAD);

//**************************************
// BUILD TRAINING (AND FILLER) TRIALS
//***************************************

var train_audios_correct = []; 
var train_audios_answer = [];
var train_audios_wrong = []; 
var filler1_audios_correct = [];
var filler1_audios_answer = [];
var filler1_audios_wrong = [];
var filler2_audios_correct = [];
var filler2_audios_answer = [];
var filler2_audios_wrong = [];
var filler3_audios_correct = [];
var filler3_audios_answer = [];
var filler3_audios_wrong = [];
var filler4_audios_correct = [];
var filler4_audios_answer = [];
var filler4_audios_wrong = [];
var img_ix = [];
var ans_ixs = [0, 1, 2, 3, 4];
  

for  (j = 0; j < one_syll_train.length+two_syll_train.length; j++){
    for (k = 0; k < word_nums.length; k++){ 
            if (j >= one_syll_train.length){
                this_groupNum = two_syll_train[j-one_syll_train.length];
                this_syllNum = syll_nums[1];
            }
            if (j < one_syll_train.length){
                this_groupNum = one_syll_train[j];
                this_syllNum = syll_nums[0];
            }  
            if (i_or_e == "explicit"){
                train_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][0]);
                filler1_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][1]);
                filler2_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][2]);
                filler3_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][3]);
                filler4_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][4]);
                
                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                train_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                filler1_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                filler2_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                filler3_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                filler4_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                
                if (this_syllNum == "TwoKo"){
                    train_audios_wrong.push("TwoPi"+"_"+this_groupNum+word_nums[k]+get_t["TwoPi_"+this_groupNum+"_"+word_nums[k]][0]);
                    filler1_audios_wrong.push("TwoPi"+"_"+this_groupNum+word_nums[k]+get_t["TwoPi_"+this_groupNum+"_"+word_nums[k]][1]);
                    filler2_audios_wrong.push("TwoPi"+"_"+this_groupNum+word_nums[k]+get_t["TwoPi_"+this_groupNum+"_"+word_nums[k]][2]);
                    filler3_audios_wrong.push("TwoPi"+"_"+this_groupNum+word_nums[k]+get_t["TwoPi_"+this_groupNum+"_"+word_nums[k]][3]);
                    filler4_audios_wrong.push("TwoPi"+"_"+this_groupNum+word_nums[k]+get_t["TwoPi_"+this_groupNum+"_"+word_nums[k]][4]);
                }
                if (this_syllNum == "OneKo"){
                    train_audios_wrong.push("OnePi"+"_"+this_groupNum+word_nums[k]+get_t["OnePi_"+this_groupNum+"_"+word_nums[k]][0]);
                    filler1_audios_wrong.push("OnePi"+"_"+this_groupNum+word_nums[k]+get_t["OnePi_"+this_groupNum+"_"+word_nums[k]][1]);
                    filler2_audios_wrong.push("OnePi"+"_"+this_groupNum+word_nums[k]+get_t["OnePi_"+this_groupNum+"_"+word_nums[k]][2]);
                    filler3_audios_wrong.push("OnePi"+"_"+this_groupNum+word_nums[k]+get_t["OnePi_"+this_groupNum+"_"+word_nums[k]][3]);
                    filler4_audios_wrong.push("OnePi"+"_"+this_groupNum+word_nums[k]+get_t["OnePi_"+this_groupNum+"_"+word_nums[k]][4]);
                }
                if (this_syllNum == "TwoPi"){
                    train_audios_wrong.push("TwoKo"+"_"+this_groupNum+word_nums[k]+get_t["TwoKo_"+this_groupNum+"_"+word_nums[k]][0]);
                    filler1_audios_wrong.push("TwoKo"+"_"+this_groupNum+word_nums[k]+get_t["TwoKo_"+this_groupNum+"_"+word_nums[k]][1]);
                    filler2_audios_wrong.push("TwoKo"+"_"+this_groupNum+word_nums[k]+get_t["TwoKo_"+this_groupNum+"_"+word_nums[k]][2]);
                    filler3_audios_wrong.push("TwoKo"+"_"+this_groupNum+word_nums[k]+get_t["TwoKo_"+this_groupNum+"_"+word_nums[k]][3]);
                    filler4_audios_wrong.push("TwoKo"+"_"+this_groupNum+word_nums[k]+get_t["TwoKo_"+this_groupNum+"_"+word_nums[k]][4]);
                }
                if (this_syllNum == "OnePi"){
                    train_audios_wrong.push("OneKo"+"_"+this_groupNum+word_nums[k]+get_t["OneKo_"+this_groupNum+"_"+word_nums[k]][0]);
                    filler1_audios_wrong.push("OneKo"+"_"+this_groupNum+word_nums[k]+get_t["OneKo_"+this_groupNum+"_"+word_nums[k]][1]);
                    filler2_audios_wrong.push("OneKo"+"_"+this_groupNum+word_nums[k]+get_t["OneKo_"+this_groupNum+"_"+word_nums[k]][2]);
                    filler3_audios_wrong.push("OneKo"+"_"+this_groupNum+word_nums[k]+get_t["OneKo_"+this_groupNum+"_"+word_nums[k]][3]);
                    filler4_audios_wrong.push("OneKo"+"_"+this_groupNum+word_nums[k]+get_t["OneKo_"+this_groupNum+"_"+word_nums[k]][4]);
                } 
            }
            if (i_or_e == "implicit"){
                if (k == (word_nums.length-1)){
                    wrong_word = word_nums[0]
                }
                else {
                    wrong_word = word_nums[k+1]
                }
                
                train_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][0]);
                filler1_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][1]);
                filler2_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][2]);
                filler3_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][3]);
                filler4_audios_correct.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][4]);

                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                train_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                filler1_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                filler2_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                filler3_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                ans_ix = ans_ixs[Math.floor(Math.random() * ans_ixs.length)];
                filler4_audios_answer.push(this_syllNum+"_"+this_groupNum+word_nums[k]+get_t[this_syllNum+"_"+this_groupNum+"_"+word_nums[k]][ans_ix]);
                    
                train_audios_wrong.push(this_syllNum+"_"+this_groupNum+wrong_word+get_t[this_syllNum+"_"+this_groupNum+"_"+wrong_word][0]);
                filler1_audios_wrong.push(this_syllNum+"_"+this_groupNum+wrong_word+get_t[this_syllNum+"_"+this_groupNum+"_"+wrong_word][1]);
                filler2_audios_wrong.push(this_syllNum+"_"+this_groupNum+wrong_word+get_t[this_syllNum+"_"+this_groupNum+"_"+wrong_word][2]);
                filler3_audios_wrong.push(this_syllNum+"_"+this_groupNum+wrong_word+get_t[this_syllNum+"_"+this_groupNum+"_"+wrong_word][3]);
                filler4_audios_wrong.push(this_syllNum+"_"+this_groupNum+wrong_word+get_t[this_syllNum+"_"+this_groupNum+"_"+wrong_word][4]);        
            }  
            img_ix.push((j*10)+(k));    
    }    
} 
 
var audio_dir = "https://people.umass.edu/bprickett/Phono_IE_Stimuli/";
var train_correct_audios = [];
var train_correct_quests = [];
var train_answers = []
var train_names = [];

var filler1_correct_audios = [];
var filler1_correct_quests = [];
var filler1_answers = []
var filler1_names = [];

var filler2_correct_audios = [];
var filler2_correct_quests = [];
var filler2_answers = []
var filler2_names = [];

var filler3_correct_audios = [];
var filler3_correct_quests = [];
var filler3_answers = []
var filler3_names = [];

var filler4_correct_audios = [];
var filler4_correct_quests = [];
var filler4_answers = []
var filler4_names = [];

var player_function_1 = "<script>function audioEndPreA() {a = document.getElementById('option_A');a.style.color = 'red';a.style.fontWeight = 'bold';document.getElementById('a_player').play();}";
var player_function_2 = "function audioEndPostA() {a = document.getElementById('option_A');a.style.color = 'black';a.style.fontWeight = 'normal';document.getElementById('sil_2').play();}";
var player_function_3 = "function audioEndPreB() {b = document.getElementById('option_B');b.style.color = 'red';b.style.fontWeight = 'bold';document.getElementById('b_player').play();}";
var player_function_4 = "function audioEndPostB() {b = document.getElementById('option_B'); b.style.color = 'black';b.style.fontWeight = 'normal';}</script>";
var player_functions = player_function_1.concat(player_function_2).concat(player_function_3).concat(player_function_4);

var silence_one = "<audio style='visibility:hidden;' id='sil_1' controls autoplay onended='audioEndPreA()'><source src='".concat(audio_dir).concat("silence.wav'></audio>");
var silence_two = "<audio style='visibility:hidden;' id='sil_2' controls onended='audioEndPreB()'><source src='".concat(audio_dir).concat("silence.wav'></audio>");
    

for (i = 0; i < train_audios_correct.length; i ++){
    //TRAINING TRIALS
    //Randomize which side the correct word happens on:
    word_options = ["A", "B"]; 
    shuffle(word_options);
    var correct_word =  word_options[0];
    
    //Set up the stimulus pairs:
    if (correct_word == "A"){
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(train_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(train_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");          
    }
    else {
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(train_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(train_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");  
    }

    //Build the two pages that have audio in them:
    var train_correct_audio = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
    var train_answer = "<table align='center'><tr><td><img src='".concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td><td><img src='").concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td></tr></table><p align='center'>The correct word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls autoplay id='answer_audio' align='center'><source src='").concat(audio_dir).concat(train_audios_answer[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    
    //Set up the item objects ("audios"=page that asks S's to choose between two recordings, "quests"=page that shows the picture, "answers"=page that gives the correct answer):
    train_correct_audios.push(["train_correct_audio_"+i, "ComicCaption", {s:"", q:train_correct_audio, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:correct_word, as:["A", "B"]}]);
    train_correct_quests.push(["train_correct_quest_"+i, "my_Separator", {normalMessage:'<div align="center">Study this image carefully:</div><br><br><table align="center"><tr><td><img src="'.concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td><td><img src="').concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td></tr></table><p align="center"><br><br>Press any key to continue.'), errorMessage:"", transfer:"keypress"}]);
    train_answers.push(["train_answer_"+i, "my_Separator", {normalMessage:train_answer, errorMessage:"", transfer:2000}])
    train_names.push(["train_correct_quest_"+i, "train_correct_audio_"+i, "feedback", "train_answer_"+i]);

    //FILLER SET 1 TRIALS
    //Randomize which side the correct word happens on:
    word_options = ["A", "B"]; 
    shuffle(word_options);
    var correct_word =  word_options[0];
    
    //Set up the stimulus pairs:
    if (correct_word == "A"){
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(filler1_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(filler1_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");          
    }
    else {
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(filler1_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(filler1_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");  
    }

    //Build the two pages that have audio in them:
    var filler1_correct_audio = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
    var filler1_answer = "<table align='center'><tr><td><img src='".concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td><td><img src='").concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td></tr></table><p align='center'>The correct word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls autoplay id='answer_audio' align='center'><source src='").concat(audio_dir).concat(filler1_audios_answer[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    
    //Set up the item objects ("audios"=page that asks S's to choose between two recordings, "quests"=page that shows the picture, "answers"=page that gives the correct answer):
    filler1_correct_audios.push(["filler1_correct_audio_"+i, "ComicCaption", {s:"", q:filler1_correct_audio, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:correct_word, as:["A", "B"]}]);
    filler1_correct_quests.push(["filler1_correct_quest_"+i, "my_Separator", {normalMessage:'<div align="center">Study this image carefully:</div><br><br><table align="center"><tr><td><img src="'.concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td><td><img src="').concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td></tr></table><p align="center"><br><br>Press any key to continue.'), errorMessage:"", transfer:"keypress"}]);
    filler1_answers.push(["filler1_answer_"+i, "my_Separator", {normalMessage:filler1_answer, errorMessage:"", transfer:2000}])
    filler1_names.push(["filler1_correct_quest_"+i, "filler1_correct_audio_"+i, "feedback", "filler1_answer_"+i]);

    //FILLER SET 2 TRIALS
    //Randomize which side the correct word happens on:
    word_options = ["A", "B"]; 
    shuffle(word_options);
    var correct_word =  word_options[0];
    
    //Set up the stimulus pairs:
    if (correct_word == "A"){
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(filler2_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(filler2_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");          
    }
    else {
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(filler2_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(filler2_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");  
    }

    //Build the two pages that have audio in them:
    var filler2_correct_audio = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
    var filler2_answer = "<table align='center'><tr><td><img src='".concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td><td><img src='").concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td></tr></table><p align='center'>The correct word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls autoplay id='answer_audio' align='center'><source src='").concat(audio_dir).concat(filler2_audios_answer[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    
    //Set up the item objects ("audios"=page that asks S's to choose between two recordings, "quests"=page that shows the picture, "answers"=page that gives the correct answer):
    filler2_correct_audios.push(["filler2_correct_audio_"+i, "ComicCaption", {s:"", q:filler2_correct_audio, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:correct_word, as:["A", "B"]}]);
    filler2_correct_quests.push(["filler2_correct_quest_"+i, "my_Separator", {normalMessage:'<div align="center">Study this image carefully:</div><br><br><table align="center"><tr><td><img src="'.concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td><td><img src="').concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td></tr></table><p align="center"><br><br>Press any key to continue.'), errorMessage:"", transfer:"keypress"}]);
    filler2_answers.push(["filler2_answer_"+i, "my_Separator", {normalMessage:filler2_answer, errorMessage:"", transfer:2000}])
    filler2_names.push(["filler2_correct_quest_"+i, "filler2_correct_audio_"+i, "feedback", "filler2_answer_"+i]);

    //FILLER SET 3 TRIALS
    //Randomize which side the correct word happens on:
    word_options = ["A", "B"]; 
    shuffle(word_options);
    var correct_word =  word_options[0];
    
    //Set up the stimulus pairs:
    if (correct_word == "A"){
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(filler3_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(filler3_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");          
    }
    else {
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(filler3_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(filler3_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");  
    }

    //Build the two pages that have audio in them:
    var filler3_correct_audio = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
    var filler3_answer = "<table align='center'><tr><td><img src='".concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td><td><img src='").concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td></tr></table><p align='center'>The correct word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls autoplay id='answer_audio' align='center'><source src='").concat(audio_dir).concat(filler3_audios_answer[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    
    //Set up the item objects ("audios"=page that asks S's to choose between two recordings, "quests"=page that shows the picture, "answers"=page that gives the correct answer):
    filler3_correct_audios.push(["filler3_correct_audio_"+i, "ComicCaption", {s:"", q:filler3_correct_audio, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:correct_word, as:["A", "B"]}]);
    filler3_correct_quests.push(["filler3_correct_quest_"+i, "my_Separator", {normalMessage:'<div align="center">Study this image carefully:</div><br><br><table align="center"><tr><td><img src="'.concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td><td><img src="').concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td></tr></table><p align="center"><br><br>Press any key to continue.'), errorMessage:"", transfer:"keypress"}]);
    filler3_answers.push(["filler3_answer_"+i, "my_Separator", {normalMessage:filler3_answer, errorMessage:"", transfer:2000}])
    filler3_names.push(["filler3_correct_quest_"+i, "filler3_correct_audio_"+i, "feedback", "filler3_answer_"+i]);

    //FILLER SET 4 TRIALS
    //Randomize which side the correct word happens on:
    word_options = ["A", "B"]; 
    shuffle(word_options);
    var correct_word =  word_options[0];
    
    //Set up the stimulus pairs:
    if (correct_word == "A"){
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(filler4_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(filler4_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");          
    }
    else {
        var audio_a = "<audio style='visibility:hidden;' id='a_player' controls onended='audioEndPostA()'><source src='".concat(audio_dir).concat(filler4_audios_wrong[i]).concat(".wav' type='audio/wav'></audio>");
        var audio_b = "<audio style='visibility:hidden;' id='b_player' controls onended='audioEndPostB()'><source src='".concat(audio_dir).concat(filler4_audios_correct[i]).concat(".wav' type='audio/wav'></audio>");  
    }

    //Build the two pages that have audio in them:
    var filler4_correct_audio = silence_one.concat(silence_two).concat(audio_a).concat(audio_b).concat(player_functions).concat("<table align='center'><tr><td align='center'><div align='center'><i>Which of these is the correct word for that picture?</i></div></td></tr></table><table align='center'><tr><td><font color='white'>__</font><span id='option_A'>A</span></td><td><p style='visibility:hidden;'>__</p></td><td><font color='white'>__</font><span id='option_B'>B</div></td></tr></table>");
    var filler4_answer = "<table align='center'><tr><td><img src='".concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td><td><img src='").concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat("'></td></tr></table><p align='center'>The correct word for this image is:</p><table align='center' style='border-style:solid;border-color:green;'><tr><td><audio controls autoplay id='answer_audio' align='center'><source src='").concat(audio_dir).concat(filler4_audios_answer[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    
    //Set up the item objects ("audios"=page that asks S's to choose between two recordings, "quests"=page that shows the picture, "answers"=page that gives the correct answer):
    filler4_correct_audios.push(["filler4_correct_audio_"+i, "ComicCaption", {s:"", q:filler4_correct_audio, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:correct_word, as:["A", "B"]}]);
    filler4_correct_quests.push(["filler4_correct_quest_"+i, "my_Separator", {normalMessage:'<div align="center">Study this image carefully:</div><br><br><table align="center"><tr><td><img src="'.concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td><td><img src="').concat(IMAGES_TO_PRELOAD[img_ix[i]]).concat('"></td></tr></table><p align="center"><br><br>Press any key to continue.'), errorMessage:"", transfer:"keypress"}]);
    filler4_answers.push(["filler4_answer_"+i, "my_Separator", {normalMessage:filler4_answer, errorMessage:"", transfer:2000}])
    filler4_names.push(["filler4_correct_quest_"+i, "filler4_correct_audio_"+i, "feedback", "filler4_answer_"+i]);
}
    
//If we want all our training trials in a single block, 
//mix the fillers in with the regular training trials:
if (train_in_block){
    train1_names = train_names;
    train2_names = filler1_names;
    train3_names = filler2_names;
    train4_names = filler3_names;
    train5_names = filler4_names;

    //Shuffle training trials up:
    shuffle(train1_names);//  og training trials
    shuffle(train2_names);// = filler1_names;
    shuffle(train3_names);// = filler2_names;
    shuffle(train4_names);// = filler3_names;
    shuffle(train5_names);// = filler4_names;
}
else{   
    //Shuffle training trials up:   
    shuffle(train_names);
}

//**************************************
// BUILD TESTING TRIALS
//***************************************
var test1_audios_correct = [];
var test1_audios_wrong = [];
var test2_audios_correct = [];
var test2_audios_wrong = [];
var test3_audios_correct = [];
var test3_audios_wrong = [];
var test4_audios_correct = [];
var test4_audios_wrong = [];
var train_stim_num = img_ix.length;
var counter = 0;

//Organize all the test stimuli into different blocks:
for  (j = 0; j < one_syll_correct_test.length; j++){
    for (k = 0; k < word_nums.length; k++){
            //If /-pi/ goes with two-syllable words:
            if (pi_with == "two"){
                if (counter < 5){
                    //One syllable word, correctly produced:
                    test1_audios_correct.push(all_syll_nums[0]+"_"+one_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[0]+"_"+one_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //One syllable word, incorrectly produced:
                    test1_audios_wrong.push(all_syll_nums[1]+"_"+one_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[1]+"_"+one_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, correctly produced:
                    test1_audios_correct.push(all_syll_nums[2]+"_"+two_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[2]+"_"+two_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, incorrectly produced:
                    test1_audios_wrong.push(all_syll_nums[3]+"_"+two_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[3]+"_"+two_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                }
                if (counter >= 5 && counter < 10){
                    //One syllable word, correctly produced:
                    test2_audios_correct.push(all_syll_nums[0]+"_"+one_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[0]+"_"+one_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //One syllable word, incorrectly produced:
                    test2_audios_wrong.push(all_syll_nums[1]+"_"+one_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[1]+"_"+one_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, correctly produced:
                    test2_audios_correct.push(all_syll_nums[2]+"_"+two_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[2]+"_"+two_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, incorrectly produced:
                    test2_audios_wrong.push(all_syll_nums[3]+"_"+two_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[3]+"_"+two_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                }
                if (counter >= 10 && counter < 15){
                    //One syllable word, correctly produced:
                    test3_audios_correct.push(all_syll_nums[0]+"_"+one_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[0]+"_"+one_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //One syllable word, incorrectly produced:
                    test3_audios_wrong.push(all_syll_nums[1]+"_"+one_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[1]+"_"+one_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, correctly produced:
                    test3_audios_correct.push(all_syll_nums[2]+"_"+two_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[2]+"_"+two_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, incorrectly produced:
                    test3_audios_wrong.push(all_syll_nums[3]+"_"+two_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[3]+"_"+two_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                }
                if (counter >= 15 && counter < 20){
                    //One syllable word, correctly produced:
                    test4_audios_correct.push(all_syll_nums[0]+"_"+one_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[0]+"_"+one_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //One syllable word, incorrectly produced:
                    test4_audios_wrong.push(all_syll_nums[1]+"_"+one_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[1]+"_"+one_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, correctly produced:
                    test4_audios_correct.push(all_syll_nums[2]+"_"+two_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[2]+"_"+two_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, incorrectly produced:
                    test4_audios_wrong.push(all_syll_nums[3]+"_"+two_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[3]+"_"+two_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                }   
            }
            //If /-pi/ goes with one-syllable words: 
            if (pi_with == "one"){   
                if (counter < 5){
                    //One syllable word, correctly produced:
                    test1_audios_correct.push(all_syll_nums[1]+"_"+one_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[1]+"_"+one_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //One syllable word, incorrectly produced:
                    test1_audios_wrong.push(all_syll_nums[0]+"_"+one_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[0]+"_"+one_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, correctly produced:
                    test1_audios_correct.push(all_syll_nums[3]+"_"+two_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[3]+"_"+two_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, incorrectly produced:
                    test1_audios_wrong.push(all_syll_nums[2]+"_"+two_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[2]+"_"+two_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                }
                if (counter >= 5 && counter < 10){
                    //One syllable word, correctly produced:
                    test2_audios_correct.push(all_syll_nums[1]+"_"+one_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[1]+"_"+one_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //One syllable word, incorrectly produced:
                    test2_audios_wrong.push(all_syll_nums[0]+"_"+one_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[0]+"_"+one_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, correctly produced:
                    test2_audios_correct.push(all_syll_nums[3]+"_"+two_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[3]+"_"+two_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, incorrectly produced:
                    test2_audios_wrong.push(all_syll_nums[2]+"_"+two_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[2]+"_"+two_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                }
                if (counter >= 10 && counter < 15){
                    //One syllable word, correctly produced:
                    test3_audios_correct.push(all_syll_nums[1]+"_"+one_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[1]+"_"+one_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //One syllable word, incorrectly produced:
                    test3_audios_wrong.push(all_syll_nums[0]+"_"+one_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[0]+"_"+one_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, correctly produced:
                    test3_audios_correct.push(all_syll_nums[3]+"_"+two_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[3]+"_"+two_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, incorrectly produced:
                    test3_audios_wrong.push(all_syll_nums[2]+"_"+two_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[2]+"_"+two_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                }
                if (counter >= 15 && counter < 20){
                    //One syllable word, correctly produced:
                    test4_audios_correct.push(all_syll_nums[1]+"_"+one_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[1]+"_"+one_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //One syllable word, incorrectly produced:
                    test4_audios_wrong.push(all_syll_nums[0]+"_"+one_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[0]+"_"+one_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, correctly produced:
                    test4_audios_correct.push(all_syll_nums[3]+"_"+two_syll_correct_test[j]+word_nums[k]+get_t[all_syll_nums[3]+"_"+two_syll_correct_test[j]+"_"+word_nums[k]][0]);
                    //Two syllable word, incorrectly produced:
                    test4_audios_wrong.push(all_syll_nums[2]+"_"+two_syll_wrong_test[j]+word_nums[k]+get_t[all_syll_nums[2]+"_"+two_syll_wrong_test[j]+"_"+word_nums[k]][0]);
                }                  
            }
            counter ++;   
    }    
} 
 
var test1_correct_audios = [];
var test1_correct_quests = [];
var test1_wrong_audios = [];
var test1_wrong_quests = [];
var test1_answers = []
var test1_names = [];

var test2_correct_audios = [];
var test2_correct_quests = [];
var test2_wrong_audios = [];
var test2_wrong_quests = [];
var test2_answers = []
var test2_names = [];

var test3_correct_audios = [];
var test3_correct_quests = [];
var test3_wrong_audios = [];
var test3_wrong_quests = [];
var test3_answers = []
var test3_names = [];

var test4_correct_audios = [];
var test4_correct_quests = [];
var test4_wrong_audios = [];
var test4_wrong_quests = [];
var test4_answers = []
var test4_names = [];

//Create test trials, organized by block:
for (i = 0; i < test1_audios_correct.length; i ++){
    //Block  1
    var test1_question = "<p id='wrong_instruct'><i>Did the word you just listened to sound like it belongs to the language you're learning?</i></p>";
    var test1_correct_audio = "<table align='center'><tr><td align='center'><p><i>Listen to the following word:</i></p></td></tr><tr><td><p style='visibility:hidden;'>white space</p></td></tr><tr><td><audio id='correct_audio' controls autoplay><source src='".concat(audio_dir).concat(test1_audios_correct[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    var test1_wrong_audio = "<table align='center'><tr><td align='center'><p><i>Listen to the following word:</i></p></td></tr><tr><td><p style='visibility:hidden;'>white space</p></td></tr><tr><td><audio id='wrong_audio' controls autoplay><source src='".concat(audio_dir).concat(test1_audios_wrong[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
  
    test1_correct_audios.push(["test1_correct_audio_"+i, "my_Separator", {normalMessage:test1_correct_audio, errorMessage:""}]);
    test1_correct_quests.push(["test1_correct_quest_"+i, "ComicCaption", {s:"", q:test1_question, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:"Yes"}]);
    test1_wrong_audios.push(["test1_wrong_audio_"+i, "my_Separator", {normalMessage:test1_wrong_audio, errorMessage:""}]);
    test1_wrong_quests.push(["test1_wrong_quest_"+i, "ComicCaption", {s:"", q:test1_question, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:"No"}]);
    test1_names.push(["test1_correct_audio_"+i, "test1_correct_quest_"+i,"test1_answer_"+i]);
    test1_names.push(["test1_wrong_audio_"+i, "test1_wrong_quest_"+i,"test1_answer_"+i]);

    //Block  2    
    var test2_question = "<p id='wrong_instruct'><i>Did the word you just listened to sound like it belongs to the language you're learning?</i></p>";
    var test2_correct_audio = "<table align='center'><tr><td align='center'><p><i>Listen to the following word:</i></p></td></tr><tr><td><p style='visibility:hidden;'>white space</p></td></tr><tr><td><audio id='correct_audio' controls autoplay><source src='".concat(audio_dir).concat(test2_audios_correct[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    var test2_wrong_audio = "<table align='center'><tr><td align='center'><p><i>Listen to the following word:</i></p></td></tr><tr><td><p style='visibility:hidden;'>white space</p></td></tr><tr><td><audio id='wrong_audio' controls autoplay><source src='".concat(audio_dir).concat(test2_audios_wrong[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    var test2_answer = "<p align='center'>The correct word for that image was:</p><table><tr><td><audio controls autoplay id='answer_audio'><source src='".concat(audio_dir).concat(test2_audios_correct[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    
    test2_correct_audios.push(["test2_correct_audio_"+i, "my_Separator", {normalMessage:test2_correct_audio, errorMessage:""}]);
    test2_correct_quests.push(["test2_correct_quest_"+i, "ComicCaption", {s:"", q:test2_question, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:"Yes"}]);
    test2_wrong_audios.push(["test2_wrong_audio_"+i, "my_Separator", {normalMessage:test2_wrong_audio, errorMessage:""}]);
    test2_wrong_quests.push(["test2_wrong_quest_"+i, "ComicCaption", {s:"", q:test2_question, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:"No"}]);
    test2_names.push(["test2_correct_audio_"+i, "test2_correct_quest_"+i]);
    test2_names.push(["test2_wrong_audio_"+i, "test2_wrong_quest_"+i]);

    //Block  3    
    var test3_question = "<p id='wrong_instruct'><i>Did the word you just listened to sound like it belongs to the language you're learning?</i></p>";
    var test3_correct_audio = "<table align='center'><tr><td align='center'><p><i>Listen to the following word:</i></p></td></tr><tr><td><p style='visibility:hidden;'>white space</p></td></tr><tr><td><audio id='correct_audio' controls autoplay><source src='".concat(audio_dir).concat(test3_audios_correct[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    var test3_wrong_audio = "<table align='center'><tr><td align='center'><p><i>Listen to the following word:</i></p></td></tr><tr><td><p style='visibility:hidden;'>white space</p></td></tr><tr><td><audio id='wrong_audio' controls autoplay><source src='".concat(audio_dir).concat(test3_audios_wrong[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    var test3_answer = "<p align='center'>The correct word for that image was:</p><table><tr><td><audio controls autoplay id='answer_audio'><source src='".concat(audio_dir).concat(test3_audios_correct[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    
    test3_correct_audios.push(["test3_correct_audio_"+i, "my_Separator", {normalMessage:test3_correct_audio, errorMessage:""}]);
    test3_correct_quests.push(["test3_correct_quest_"+i, "ComicCaption", {s:"", q:test3_question, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:"Yes"}]);
    test3_wrong_audios.push(["test3_wrong_audio_"+i, "my_Separator", {normalMessage:test3_wrong_audio, errorMessage:""}]);
    test3_wrong_quests.push(["test3_wrong_quest_"+i, "ComicCaption", {s:"", q:test3_question, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:"No"}]);
    test3_names.push(["test3_correct_audio_"+i, "test3_correct_quest_"+i]);
    test3_names.push(["test3_wrong_audio_"+i, "test3_wrong_quest_"+i]);

    //Block  4    
    var test4_question = "<p id='wrong_instruct'><i>Did the word you just listened to sound like it belongs to the language you're learning?</i></p>";
    var test4_correct_audio = "<table align='center'><tr><td align='center'><p><i>Listen to the following word:</i></p></td></tr><tr><td><p style='visibility:hidden;'>white space</p></td></tr><tr><td><audio id='correct_audio' controls autoplay><source src='".concat(audio_dir).concat(test4_audios_correct[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    var test4_wrong_audio = "<table align='center'><tr><td align='center'><p><i>Listen to the following word:</i></p></td></tr><tr><td><p style='visibility:hidden;'>white space</p></td></tr><tr><td><audio id='wrong_audio' controls autoplay><source src='".concat(audio_dir).concat(test4_audios_wrong[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    var test4_answer = "<p align='center'>The correct word for that image was:</p><table><tr><td><audio controls autoplay id='answer_audio'><source src='".concat(audio_dir).concat(test4_audios_correct[i]).concat(".wav' type='audio/wav'></audio></td></tr></table>");
    
    test4_correct_audios.push(["test4_correct_audio_"+i, "my_Separator", {normalMessage:test4_correct_audio, errorMessage:""}]);
    test4_correct_quests.push(["test4_correct_quest_"+i, "ComicCaption", {s:"", q:test4_question, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:"Yes"}]);
    test4_wrong_audios.push(["test4_wrong_audio_"+i, "my_Separator", {normalMessage:test4_wrong_audio, errorMessage:""}]);
    test4_wrong_quests.push(["test4_wrong_quest_"+i, "ComicCaption", {s:"", q:test4_question, html:pic_dir.concat("white_square").concat(".jpg"), hasCorrect:"No"}]);
    test4_names.push(["test4_correct_audio_"+i, "test4_correct_quest_"+i]);
    test4_names.push(["test4_wrong_audio_"+i, "test4_wrong_quest_"+i]);

}


//**********************
// BUILD ITEMS ARRAY
//***********************

//Start material:
if (i_or_e == "explicit"){
    welcome_screen = "<h3>Welcome!</h3><p>In this experiment you will be learning the words of a new language. You will see a picture, and then hear two words.</p><ul><li>Your task is to decide which word sounds right for this language. After you choose a word, the word that is a part of the language will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should be able to figure out the rule about the words in this new language.</li></ul><p>Be sure to be using headphones so that you can carefully listen to each word. Also, please use a computer (as opposed to a smart phone), so that you can clearly see all of the pictures.</p><p><input type='checkbox' class='obligatory'> I have read the <a href='https://people.umass.edu/bprickett/ConsentForm_PhonoIE.pdf' target='_blank'>consent form</a> (as well as the instructions above) and agree to participate in this experiment.</p>";
}
else {
    welcome_screen = "<h3>Welcome!</h3><p>In this experiment you will be learning the words of a new language. You will see a picture, and then hear two words.</p><ul><li>Your task is to decide which word correctly describes the picture. After you choose a word, the correct word for that picture will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should start to recognize some of the words.</li></ul><p>Be sure to be using headphones so that you can carefully listen to each word. Also, please use a computer (as opposed to a smart phone), so that you can clearly see all of the pictures.</p><p><input type='checkbox' class='obligatory'> I have read the <a href='https://people.umass.edu/bprickett/ConsentForm_PhonoIE.pdf' target='_blank'>consent form</a> (as well as the instructions above) and agree to participate in this experiment.</p>";
}
var items = [
               ["preload", "Preloader", {images: IMAGES_TO_PRELOAD}], 
               [
                   "intro", 
                   "Form", 
                   {
                       html: welcome_screen, 
                       continueMessage: "Continue",
                       continueOnReturn: false
                   }
               ],
               ["audio_test", "Form", {html:"<h3>Audio Test</h3><p>Before beginning the experiment, use this short audio clip to make sure your volume is set to the correct level and your headphones are working.</p><audio controls><source src='https://www.w3schools.com/html/horse.ogg' type='audio/ogg'><source src='https://www.w3schools.com/html/horse.mp3' type='audio/mpeg'>Your browser does not support the audio element. Try using and updated version of Chrome, and if the problem still persists, contact the researchers.</audio>", continueMessage: "Click here to begin the experiment"}],
               ["sep", "Separator", {normalMessage:"Press any key to continue.", errorMessage:"Press any key to continue.", transfer:"keypress", ignoreFailure: true}],
               ["feedback", "my_Separator", {normalMessage:"<img src='https://people.umass.edu/bprickett/Phono_IE_Stimuli/Check_Pic.png'>", errorMessage:"<img src='https://people.umass.edu/bprickett/Phono_IE_Stimuli/X_pic.png'>", transfer:1000, ignoreFailure: false}]];

// Training...
items = items.concat(train_correct_quests);
items = items.concat(train_correct_audios);
items = items.concat(train_answers);

//First set of fillers...
items = items.concat(filler1_correct_audios);
items = items.concat(filler1_correct_quests);
items = items.concat(filler1_answers);

//Second set of fillers...
items = items.concat(filler2_correct_audios);
items = items.concat(filler2_correct_quests);
items = items.concat(filler2_answers);

//Third set of fillers...
items = items.concat(filler3_correct_audios);
items = items.concat(filler3_correct_quests);
items = items.concat(filler3_answers);

//Fourth set of fillers...
items = items.concat(filler4_correct_audios);
items = items.concat(filler4_correct_quests);
items = items.concat(filler4_answers);

//First set of test items...
items = items.concat(test1_correct_audios);
items = items.concat(test1_correct_quests);
items = items.concat(test1_wrong_audios);
items = items.concat(test1_wrong_quests);

//Second set of test items...
items = items.concat(test2_correct_audios);
items = items.concat(test2_correct_quests);
items = items.concat(test2_wrong_audios);
items = items.concat(test2_wrong_quests);

//Third set of test items...
items = items.concat(test3_correct_audios);
items = items.concat(test3_correct_quests);
items = items.concat(test3_wrong_audios);
items = items.concat(test3_wrong_quests);

//Fourth set of test items...
items = items.concat(test4_correct_audios);
items = items.concat(test4_correct_quests);
items = items.concat(test4_wrong_audios);
items = items.concat(test4_wrong_quests);

//Message for the middle of the experiment:
if (train_in_block){
    if (i_or_e == "explicit"){
        var test1Intro_message = "<h3>Testing Block 1</h3><p>You've finished the first two training blocks and will now begin the test phase. You're going to be asked questions about new words and you should apply any rules you've figured out to the questions you're asked. Use what you've been learning about words from training to determine if the new words are also part of the language or not.</p>(Note that you will no longer be provided with feedback on your answers!)";
        var test2Intro_message = "<h3>Testing Block 2</h3><p>You're now ready to begin the second block of testing. Remember, you're going to be asked questions about new words and you should apply any rules you've figured out to the questions you're asked. Use what you've been learning about words from training to determine if the new words are also part of the language or not.</p>";
        var test3Intro_message = "<h3>Testing Block 3</h3><p>You're now ready to begin the third block of testing. Remember, you're going to be asked questions about new words and you should apply any rules you've figured out to the questions you're asked. Use what you've been learning about words from training to determine if the new words are also part of the language or not.</p>";
        var test4Intro_message = "<h3>Testing Block 4</h3><p>Just one more testing block left! Remember, you're going to be asked questions about new words and you should apply any rules you've figured out to the questions you're asked. Use what you've been learning about words from training to determine if the new words are also part of the language or not.</p>";
    
        var train2Intro_message = "<h3>Training Block 3</h3><p>You've made it to the third block of training. Remember:</p><ul><li>You'll see a picture, and then hear two words.</li><li>Your task is to decide which word correctly describes the picture. After you choose a word, the correct word for that picture will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should be able to learn which words match which pictures in this new language.</li></ul>";
        var train3Intro_message = "<h3>Training Block 4</h3><p>You've made it to the fourth block of training. Remember:</p><ul><li>You'll see a picture, and then hear two words.</li><li>Your task is to decide which word correctly describes the picture. After you choose a word, the correct word for that picture will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should be able to learn which words match which pictures in this new language.</li></ul>";
        var train4Intro_message = "<h3>Training Block 5</h3><p>You've made it to the fifth block of training. Remember:</p><ul><li>You'll see a picture, and then hear two words.</li><li>Your task is to decide which word correctly describes the picture. After you choose a word, the correct word for that picture will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should be able to learn which words match which pictures in this new language.</li></ul>";
        var train5Intro_message = "<h3>Training Block 2</h3><p>Nice work! You've made it to the second block of training. Remember:</p><ul><li>You'll see a picture, and then hear two words.</li><li>Your task is to decide which word correctly describes the picture. After you choose a word, the correct word for that picture will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should be able to learn which words match which pictures in this new language.</li></ul>";
     }
     else {
        var test1Intro_message = "<h3>Testing Block 1</h3><p>You've finished the first two training blocks and will now begin the test phase. You're going to hear some new words that you haven't learned. You'll be asked whether these new words sound like they are part of the same language you have been learning.</p>(Note that you will no longer be provided with feedback on your answers!)";
        var test2Intro_message = "<h3>Testing Block 2</h3><p>You're now ready to begin the second block of testing. Remember, you're going to hear some new words that you haven't learned. You'll be asked whether these new words sound like they are part of the same language you have been learning.</p>";
        var test3Intro_message = "<h3>Testing Block 3</h3><p>You're now ready to begin the third block of testing. Remember, you're going to hear some new words that you haven't learned. You'll be asked whether these new words sound like they are part of the same language you have been learning.</p>";
        var test4Intro_message = "<h3>Testing Block 4</h3><p>Just one more testing block left! Remember, you're going to hear some new words that you haven't learned. You'll be asked whether these new words sound like they are part of the same language you have been learning.</p>";
          
        var train2Intro_message = "<h3>Training Block 3</h3><p>You've made it to the third block of training. Remember:</p><ul><li>You'll see a picture, and then hear two words.</li><li>Your task is to decide which word correctly describes the picture. After you choose a word, the correct word for that picture will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should start to recognize some of the words. </li></ul>";
        var train3Intro_message = "<h3>Training Block 4</h3><p>You've made it to the fourth block of training. Remember:</p><ul><li>You'll see a picture, and then hear two words.</li><li>Your task is to decide which word correctly describes the picture. After you choose a word, the correct word for that picture will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should start to recognize some of the words. </li></ul>";
        var train4Intro_message = "<h3>Training Block 5</h3><p>You've made it to the fifth block of training. Remember:</p><ul><li>You'll see a picture, and then hear two words.</li><li>Your task is to decide which word correctly describes the picture. After you choose a word, the correct word for that picture will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should start to recognize some of the words. </li></ul>";
        var train5Intro_message = "<h3>Training Block 2</h3><p>Nice work! You've made it to the second block of training. Remember:</p><ul><li>You'll see a picture, and then hear two words.</li><li>Your task is to decide which word correctly describes the picture. After you choose a word, the correct word for that picture will be played.</li><li>At first you will just have to guess, but as the experiment goes on you should start to recognize some of the words. </li></ul>";
       
     }
}
else {
    var testIntro_message ="Now you will begin the test phase. Most trials will be the same as training, however some will ask you to answer a different kind of question about the language you've been learning and will not provide you with feedback.";
}

//Ending material:
items = items.concat([    
               [
                   "survey", 
                   "Form", 
                   {
                       consentRequired: false,
                       html: "<h2>Please answer the following questions about your experience:</h2>"+
                              "<div>"+
                                "<b>1) How did you approach the learning task? Please choose all that apply.</b><br>"+
                                  '<input type="checkbox" name="train_approach" value="intuition_gut"> Went by intuition or gut feeling.<br>'+
                                  '<input type="checkbox" name="train_approach" value="memorize"> Tried to memorize the words.<br>'+
                                  '<input type="checkbox" name="train_approach" value="rule_pattern"> Tried to find a rule or pattern.<br>'+
                                  '<input type="checkbox" name="train_approach" value="notes"> Took notes<br>'+
                                "<br><b>2) Please describe what you did in as much detail as possible. If you looked for a rule, what rules did you try?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="train_description"></textarea><br><br>'+
                                "<br><b>3) How did you approach the test trials? Please choose all that apply:</b><br>"+
                                  '<input type="checkbox" name="test_approach" value="similarity"> Chose words that sounded <i>similar</i> to the words from other trials.<br>'+
                                  '<input type="checkbox" name="test_approach" value="difference"> Chose words that sounded <i>different</i> to the words from other trials.<br>'+
                                  '<input type="checkbox" name="test_approach" value="rule_pattern"> Chose words that fit a rule or pattern.<br>'+ 
                                "<br><b>4) Again, please describe what you did in as much detail as you can. If you used a rule, what was it?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name=name="test_description"></textarea><br><br>'+
                                "<br><b>5) What percent of test trials do you think you got right?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="test_description"></textarea><br><br>'+
                                "<br><b>6) Did you have an “Aha!” moment, where you suddenly realized what the pattern was?</b><br>"+
                                  '<input type="radio" name="aha_yesNo" value="1"> Yes<br>'+
                                  '<input type="radio" name="aha_yesNo" value="0"> No<br>'+
                                "<br><b>7) If so, please describe the “aha!” moment. When did it happen? What exactly did you suddenly realize?</b><br><br>"+
                                  '<textarea rows="4" cols="50" name="aha_description"></textarea><br><br>'+
                              "</div>"+
                              "<h2>Now please enter your Prolific ID:</h2>"+
                              "<div><textarea rows='1' cols='50' name='prolific_id'></textarea><br><br></div>"
                   }
               ],
                   [
                   "train2_intro", 
                   "Message", 
                   {
                       html:train2Intro_message
                   }
               ],
               [
                   "train3_intro", 
                   "Message", 
                   {
                       html:train3Intro_message
                   }
               ],
               [
                   "train4_intro", 
                   "Message", 
                   {
                       html:train4Intro_message
                   }
               ],
               [
                   "train5_intro", 
                   "Message", 
                   {
                       html:train5Intro_message
                   }
               ],
               [
                   "test1_intro", 
                   "Message", 
                   {
                       html: test1Intro_message
                   }
               ],
               [
                   "test2_intro", 
                   "Message", 
                   {
                       html: test2Intro_message
                   }
               ],
               [
                   "test3_intro", 
                   "Message", 
                   {
                       html: test3Intro_message
                   }
               ],
               [
                   "test4_intro", 
                   "Message", 
                   {
                       html: test4Intro_message
                   }
               ],
               ["sr", "__SendResults__", { }],
               [
                   "end", 
                   "Message", 
                   {
                       transfer: "keypress",
                       html: "<div><p>Thank you for participating! To find out more about this experiment, click <a href='https://people.umass.edu/bprickett/Debriefing_PhonoIE.pdf' target='_blank'>here</a>.</p></div>"
                   }
               ]
          ]);

//Define sequence of experiment; preload must be first
var all_trials = ["preload", "intro", "audio_test"];
var ending = ["survey", "sr", "end"]; 

//Combine/Slice arrays as needed:
if (train_in_block){
    if (test_run){
        var test_block_1 = test1_names.slice(0,2);
        var test_block_2 = test2_names.slice(0,2); 
        var test_block_3 = test3_names.slice(0,2);
        var test_block_4 = test4_names.slice(0,2);
        
        train1_names = train1_names.slice(0,2);
        train2_names = train2_names.slice(0,2);
        train3_names = train3_names.slice(0,2);
        train4_names = train4_names.slice(0,2);
        train5_names = train5_names.slice(0,2);
    }
    else {
        var test_block_1 = test1_names;
        var test_block_2 = test2_names; 
        var test_block_3 = test3_names;
        var test_block_4 = test4_names;      
    }          
}
else {
    if (test_run){
        var test_block_1 = test1_names.concat(filler1_names).slice(0,2);
        var test_block_2 = test2_names.concat(filler2_names).slice(0,2); 
        var test_block_3 = test3_names.concat(filler3_names).slice(0,2);
        var test_block_4 = test4_names.concat(filler4_names).slice(0,2); 
        train_names = train_names.slice(0,2);  
    }
    else{
        var test_block_1 = test1_names.concat(filler1_names);
        var test_block_2 = test2_names.concat(filler2_names); 
        var test_block_3 = test3_names.concat(filler3_names);
        var test_block_4 = test4_names.concat(filler4_names); 
    } 

}                                         

//Train
    if (train_in_block){
        
    for (i = 0; i < train1_names.length; i ++){
            all_trials = all_trials.concat(train1_names[i]);
            all_trials.push("sep");
        }

    all_trials.push("train5_intro");
    for (i = 0; i < train5_names.length; i ++){
            all_trials = all_trials.concat(train1_names[i]);
            all_trials.push("sep");
        }

    //Test1  
    all_trials.push("test1_intro");      
    shuffle(test_block_1)   
        for (i = 0; i < test_block_1.length; i ++){
        all_trials = all_trials.concat(test_block_1[i]);
        all_trials.push("sep")
    }
                
        all_trials.push("train2_intro"); 
        for (i = 0; i < train2_names.length; i ++){
            all_trials = all_trials.concat(train2_names[i]);
            all_trials.push("sep");
        }
            
    //Test2   
    all_trials.push("test2_intro");     
    shuffle(test_block_2)   
            for (i = 0; i < test_block_2.length; i ++){
        all_trials = all_trials.concat(test_block_2[i]);
        all_trials.push("sep")
    }
                
        all_trials.push("train3_intro"); 
        for (i = 0; i < train3_names.length; i ++){
            all_trials = all_trials.concat(train3_names[i]);
            all_trials.push("sep");
        }
            
    //Test3 
    all_trials.push("test3_intro");      
    shuffle(test_block_3)   
            for (i = 0; i < test_block_3.length; i ++){
        all_trials = all_trials.concat(test_block_3[i]);
        all_trials.push("sep")
    }
                
        all_trials.push("train4_intro"); 
        for (i = 0; i < train4_names.length; i ++){
            all_trials = all_trials.concat(train4_names[i]);
            all_trials.push("sep");
        }
            
     //Test4  
    all_trials.push("test4_intro");     
    shuffle(test_block_4)   
            for (i = 0; i < test_block_4.length; i ++){
        all_trials = all_trials.concat(test_block_4[i]);
        all_trials.push("sep")
    } 
    }
    else{
        for (i = 0; i < train_names.length; i ++){
            all_trials = all_trials.concat(train_names[i]);
            all_trials.push("sep");
        }

            
    //Test1  
    all_trials.push("test1_intro");      
    shuffle(test_block_1)   
        for (i = 0; i < test_block_1.length; i ++){
        all_trials = all_trials.concat(test_block_1[i]);
        all_trials.push("sep")
    }
     
    //Test2   
    all_trials.push("test2_intro");     
    shuffle(test_block_2)   
            for (i = 0; i < test_block_2.length; i ++){
        all_trials = all_trials.concat(test_block_2[i]);
        all_trials.push("sep")
    }

    //Test3 
    all_trials.push("test3_intro");      
    shuffle(test_block_3)   
            for (i = 0; i < test_block_3.length; i ++){
        all_trials = all_trials.concat(test_block_3[i]);
        all_trials.push("sep")
    }

    //Test4  
    all_trials.push("test4_intro");     
    shuffle(test_block_4)   
            for (i = 0; i < test_block_4.length; i ++){
        all_trials = all_trials.concat(test_block_4[i]);
        all_trials.push("sep")
    }   
     
}        
        
//Ending
all_trials = all_trials.concat(ending) 
var shuffleSequence = seq(...all_trials);
var showProgressBar = false;
var manualSendResults = true;

    
//Set defaults:
var defaults = [
    "my_Separator", {
        transfer: 2500,
        normalMessage: "Press any key to continue.",
        errorMessage: "Error! Please contact experimenter.",
        ignoreFailure: true
    },
    "ComicCaption", { //Options for ComicCaption items
        //as: [["y","Yes"], ["n","No"]],
        as: ["Yes", "No"],
        presentHorizontally: true,
        instructions: "",
        leftComment: "",
        rightComment: "",
        randomOrder: false,
        saveReactionTime: true
    }
];
