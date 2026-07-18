import http from 'k6/http';
import { check,sleep } from 'k6';
import { Options } from 'k6/options';
import { ENDPOINTS } from '../../config/endpoints.ts';
import { ENV } from '../../config/environments.ts';
import { jsonHeaders } from '../../helpers/utils.ts';
import { login } from '../../helpers/auth.ts';


export const options: Options = {
    stages: [
        { duration: '20s', target: 30},
        { duration: '100s', target: 30},
        { duration: '20s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<800'],
        http_req_failed: ['rate<0.02']
    },
};

export default function(): void {

    const token = login();

    check(token, {
        "login return token": (t) => t !== null && t.length > 0,
    });

    if (!token) {
        sleep(1);
        return
    }
    sleep(1);

    // blog publico 
    const postRes = http.get(`${ENV.BASE_URL}${ENDPOINTS.BLOG.PUBLIC_POSTS}?per_page=50`, { headers: jsonHeaders});
    check(postRes, {
        'post status is 200' : (r) => r.status === 200,
        'posts response time < 500 ms' : (r) => r.timings.duration < 500,
    });
    sleep(1);
}