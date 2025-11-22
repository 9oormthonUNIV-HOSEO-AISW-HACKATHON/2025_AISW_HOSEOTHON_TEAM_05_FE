// 공통 취향 계산 유틸
// Interests 페이지에서 가족 구성원들의 취향을 기반으로
// 공통 취향 / TOP 공통 취향 등을 계산할 때 사용한다.

export interface MemberInterests {
    id: string | number;
    name: string;
    relation?: string;
    interests: string[];
    avatar: string;
}

/**
 * 모든 구성원이 공통으로 가지고 있는 취향(교집합)을 계산한다.
 * 예: ["요리", "공예"], ["공예", "게임"] => ["공예"]
 */
export const getStrictCommonInterests = (
    members: MemberInterests[]
): string[] => {
    if (!members || members.length === 0) return [];

    const interestSets = members.map(
    (m) => new Set(m.interests.filter(Boolean))
    );

    if (interestSets.length === 0) return [];

  // 첫 번째 구성원의 취향을 기준으로 시작
    let common = new Set<string>(interestSets[0]);

    for (let i = 1; i < interestSets.length; i++) {
    const current = interestSets[i];
    common = new Set([...common].filter((item) => current.has(item)));
    }

    return [...common];
};

/**
 * 각 취향별로 몇 명이 좋아하는지 집계한 맵을 만든다.
 * 예: { "요리": 2명, "게임": 1명, ... }
 */
export const buildInterestCountMap = (
    members: MemberInterests[]
): Record<string, number> => {
    const map: Record<string, number> = {};

    members.forEach((member) => {
    const uniqueInterests = Array.from(new Set(member.interests.filter(Boolean)));
    uniqueInterests.forEach((interest) => {
        map[interest] = (map[interest] || 0) + 1;
    });
    });

    return map;
};

/**
 * 각 취향별로 어떤 구성원들이 해당 취향을 가지고 있는지 매핑한다.
 * 예: { "요리": [member1, member3], "공예": [member1, member2], ... }
 */
export const buildInterestMemberMap = (
    members: MemberInterests[]
): Record<string, MemberInterests[]> => {
    const map: Record<string, MemberInterests[]> = {};

    members.forEach((member) => {
    const uniqueInterests = Array.from(new Set(member.interests.filter(Boolean)));
    uniqueInterests.forEach((interest) => {
        if (!map[interest]) {
        map[interest] = [];
        }
        map[interest].push(member);
    });
    });

    return map;
};

export interface TopCommonInterest {
    interest: string | null;
    members: MemberInterests[];
    count: number;
}

/**
 * "두 명 이상"이 공통으로 가지고 있는 취향 중에서
 * 가장 많이 겹치는 취향 TOP 1을 찾아준다.
 *
 * - interest: 공통 취향 이름 (없으면 null)
 * - members: 그 취향을 가진 구성원들
 * - count: 해당 취향을 가진 구성원 수
 */
export const findTopCommonInterest = (
    members: MemberInterests[]
): TopCommonInterest => {
    if (!members || members.length === 0) {
    return { interest: null, members: [], count: 0 };
    }

    const countMap = buildInterestCountMap(members);
    const memberMap = buildInterestMemberMap(members);

    let bestInterest: string | null = null;
    let bestCount = 0;

    Object.entries(countMap).forEach(([interest, count]) => {
    // 최소 두 명 이상이 공통으로 가져야 "공통 취향"으로 취급
    if (count >= 2 && count > bestCount) {
        bestInterest = interest;
        bestCount = count;
    }
    });

    if (!bestInterest) {
    return { interest: null, members: [], count: 0 };
    }

    return {
    interest: bestInterest,
    members: memberMap[bestInterest] || [],
    count: bestCount,
    };
};