package com.ddasoom.voice_service.voice.adapter.out.elevenlabs;

import java.util.Arrays;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SpeechScript {

    GROUNDING_001("지금 보이는 이미지는 무엇인가요?"),
    GROUNDING_002("가장 먼저 보인 색깔은 무슨 색인가요?"),
    GROUNDING_003("눈앞에 보이는 게 가볍게 느껴지나요? 무겁게 느껴지나요?"),
    GROUNDING_004("지금 보이는 이미지는 차가운 느낌인가요, 따뜻한 느낌인가요?"),
    GROUNDING_005("이미지를 보고 어떤 감정이 떠오르나요?"),
    GROUNDING_006("지금 들리는 소리는 무엇인가요?"),
    GROUNDING_007("지금 들리는 소리의 높낮이는 어떠한가요?"),
    GROUNDING_008("이 소리가 차분하게 들리나요, 아니면 활기차게 느껴지나요?"),
    GROUNDING_009("소리가 점점 커지나요, 아니면 작아지고 있나요?"),
    GROUNDING_010("지금 밟고 있는 곳은 푹신한가요 단단한가요?"),
    GROUNDING_011("지금 주변에서 들리는 소리는 무엇인가요?"),
    GROUNDING_012("지금 어떤 냄새가 나나요?"),
    GROUNDING_013("입안의 작은 맛을 그대로 느껴보세요. 어떤 맛이 느껴지나요?"),
    GROUNDING_014("지금 손끝에 닿는 감촉은 어떤가요? 그대로 느껴보세요."),
    GROUNDING_015("입고 입는 옷의 촉감에 집중해보세요. 어떤 느낌인가요?"),

    EMERGENCY_001("지금 숨을 잘 쉬고 있어. 숨이 들어오고 나가는 걸 천천히 느껴봐."),
    EMERGENCY_002("눈을 감지 말고 지금 눈에 보이는 것 한 가지만 말해봐."),
    EMERGENCY_003("바닥에 발이 닿는 느낌을 느껴봐. 천천히 발바닥으로 땅을 짚고 있는 걸 확인해 봐."),
    EMERGENCY_004("주변에서 들리는 소리 하나에 집중해봐."),
    EMERGENCY_005("바람을 느껴봐. 바람이 스쳐지나가는 걸 느껴봐."),
    EMERGENCY_006("주먹을 꽉 쥐었다 풀어봐."),
    EMERGENCY_007("눈을 감고 손을 움직여봐. 지금 손끝에 느껴지는 감촉을 느껴봐."),
    EMERGENCY_008("괜찮아, 넌 지금 안전한 공간에 있어. 주변엔 너를 안전하게 지켜줄 수 있는 게 있어."),
    EMERGENCY_009("지금 느껴지는 감정들은 잠시 나타났다가 지나가는 거야."),
    EMERGENCY_010("지금 느껴지는 불안함은 곧 사라지고 시간과 함께 흘러갈거야."),
    EMERGENCY_011("네 숨소리에 집중해봐. 마음이 조금씩 가라앉을거야."),
    EMERGENCY_012("이 순간에만 집중하며, 자연스럽게 흘려보내봐. 그럴수록 편안해질거야."),
    EMERGENCY_013("지금 이 순간을 잘 견디고 있어."),
    EMERGENCY_014("지금처럼 차분히, 한 걸음씩 나아가고 있어. 잘 해내고 있어."),
    EMERGENCY_015("다음에도 이렇게 극복할 수 있을 거야."),
    EMERGENCY_016("난 너를 믿어. 너는 최선을 다하고 있어."),
    EMERGENCY_017("너를 믿고 응원하는 사람들이 있다는 걸 잊지 마. 우리는 언제나 네 곁에 있어."),
    EMERGENCY_018("이 순간이 지나가면, 너는 한 층 더 단단해져있을거야."),

    SAMPLE_001("이 목소리로 설정됩니다.");

    private final String message;

    public static List<Script> speechScripts() {
        return Arrays.stream(values())
                .map(value -> new Script(value.name(), value.message))
                .toList();
    }
}
