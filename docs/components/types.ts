//
export interface Repo {
    icon:string
    name:string
    author: string   
    repo: string
    title: string
}

// 通过Github API获取到的仓库信息
export interface GithubRepo {
    id: number
    full_name:string
    name:string
    description:string
    stargazers_count:number
    updated_at:string
    language:string
    homepage:string
    git_url:string
    clone_url:string
    html_url:string
    topics:string[]
    forks_count:number
}

  

// {
//   "id": 480394868,
//   "node_id": "R_kgDOHKI-dA",
//   "name": "voerka-i18n",
//   "full_name": "zhangfisher/voerka-i18n",
//   "private": false,
//   "owner": {
//     "login": "zhangfisher",
//     "id": 2050579,
//     "node_id": "MDQ6VXNlcjIwNTA1Nzk=",
//     "avatar_url": "https://avatars.githubusercontent.com/u/2050579?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/zhangfisher",
//     "html_url": "https://github.com/zhangfisher",
//     "followers_url": "https://api.github.com/users/zhangfisher/followers",
//     "following_url": "https://api.github.com/users/zhangfisher/following{/other_user}",
//     "gists_url": "https://api.github.com/users/zhangfisher/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/zhangfisher/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/zhangfisher/subscriptions",
//     "organizations_url": "https://api.github.com/users/zhangfisher/orgs",
//     "repos_url": "https://api.github.com/users/zhangfisher/repos",
//     "events_url": "https://api.github.com/users/zhangfisher/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/zhangfisher/received_events",
//     "type": "User",
//     "site_admin": false
//   },
//   "html_url": "https://github.com/zhangfisher/voerka-i18n",
//   "description": "Nodejs/Vue/React International solutions",
//   "fork": false,
//   "url": "https://api.github.com/repos/zhangfisher/voerka-i18n",
//   "forks_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/forks",
//   "keys_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/keys{/key_id}",
//   "collaborators_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/collaborators{/collaborator}",
//   "teams_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/teams",
//   "hooks_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/hooks",
//   "issue_events_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/issues/events{/number}",
//   "events_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/events",
//   "assignees_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/assignees{/user}",
//   "branches_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/branches{/branch}",
//   "tags_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/tags",
//   "blobs_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/git/blobs{/sha}",
//   "git_tags_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/git/tags{/sha}",
//   "git_refs_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/git/refs{/sha}",
//   "trees_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/git/trees{/sha}",
//   "statuses_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/statuses/{sha}",
//   "languages_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/languages",
//   "stargazers_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/stargazers",
//   "contributors_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/contributors",
//   "subscribers_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/subscribers",
//   "subscription_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/subscription",
//   "commits_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/commits{/sha}",
//   "git_commits_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/git/commits{/sha}",
//   "comments_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/comments{/number}",
//   "issue_comment_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/issues/comments{/number}",
//   "contents_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/contents/{+path}",
//   "compare_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/compare/{base}...{head}",
//   "merges_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/merges",
//   "archive_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/{archive_format}{/ref}",
//   "downloads_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/downloads",
//   "issues_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/issues{/number}",
//   "pulls_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/pulls{/number}",
//   "milestones_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/milestones{/number}",
//   "notifications_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/notifications{?since,all,participating}",
//   "labels_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/labels{/name}",
//   "releases_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/releases{/id}",
//   "deployments_url": "https://api.github.com/repos/zhangfisher/voerka-i18n/deployments",
//   "created_at": "2022-04-11T13:35:20Z",
//   "updated_at": "2023-08-18T02:54:40Z",
//   "pushed_at": "2023-07-25T13:17:27Z",
//   "git_url": "git://github.com/zhangfisher/voerka-i18n.git",
//   "ssh_url": "git@github.com:zhangfisher/voerka-i18n.git",
//   "clone_url": "https://github.com/zhangfisher/voerka-i18n.git",
//   "svn_url": "https://github.com/zhangfisher/voerka-i18n",
//   "homepage": "https://zhangfisher.github.io/voerka-i18n/",
//   "size": 12212,
//   "stargazers_count": 42,
//   "watchers_count": 42,
//   "language": "JavaScript",
//   "has_issues": true,
//   "has_projects": true,
//   "has_downloads": true,
//   "has_wiki": false,
//   "has_pages": true,
//   "has_discussions": false,
//   "forks_count": 6,
//   "mirror_url": null,
//   "archived": false,
//   "disabled": false,
//   "open_issues_count": 0,
//   "license": {
//     "key": "mit",
//     "name": "MIT License",
//     "spdx_id": "MIT",
//     "url": "https://api.github.com/licenses/mit",
//     "node_id": "MDc6TGljZW5zZTEz"
//   },
//   "allow_forking": true,
//   "is_template": false,
//   "web_commit_signoff_required": false,
//   "topics": [
//     "i18n",
//     "international",
//     "react-i18n",
//     "react-i18next",
//     "react-intl",
//     "vue-i18n"
//   ],
//   "visibility": "public",
//   "forks": 6,
//   "open_issues": 0,
//   "watchers": 42,
//   "default_branch": "master",
//   "temp_clone_token": null,
//   "network_count": 6,
//   "subscribers_count": 5
// }