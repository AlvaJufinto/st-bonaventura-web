# Church Web - Audit Report

Generated: 2026-08-05
Scope: Backend N+1/Query Issues, Security Issues, Frontend Performance

> **Rule**: Fix only the way it works, never what it does. Do not change functionality or break the app. Every change must preserve existing behavior.

---

## BACKEND - N+1 / QUERY ISSUES

### B-001 [HIGH] CouncilController - N+1 Query in index()

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/CouncilController.php` |
| **Method** | `index()` |
| **Line** | ~22-36 |
| **Issue** | `$council->users()->wherePivot(...)` called inside `map()` loop causes N+1 query (1 + N queries) |
| **Root Cause** | Eager loading not used; users relationship fetched lazily per council |
| **Solution** | Use `with(['users' => fn($q) => $q->wherePivot(...)])` before `get()` |
| **Files To Change** | `app/Http/Controllers/CouncilController.php` |
| **What To Change** | Replace `Council::query()->orderBy(...)->get()->map(function($council) { $users = $council->users()->wherePivot(...)->get(); ... })` with `Council::query()->with(['users' => fn($q) => $q->wherePivot(...)])->orderBy(...)->get()->map(...)` |
| **Is Done** | Yes |

### B-002 [HIGH] OrganizationController - Missing eager load on auth()->user()->organizations

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/OrganizationController.php` |
| **Method** | `edit()`, `update()` |
| **Line** | ~27, ~41 |
| **Issue** | `auth()->user()->organizations->first()->id` triggers relationship query without eager loading first |
| **Root Cause** | `organizations` relationship accessed on User model without prior eager load |
| **Solution** | Load `organizations` relationship before accessing, or use a beforeFilter/middleware |
| **Files To Change** | `app/Http/Controllers/OrganizationController.php` |
| **What To Change** | Before `$user->organizations`, add `$user = $user->load('organizations');` or ensure middleware preloads it |
| **Is Done** | Yes |

### B-003 [MEDIUM] AboutController - Redundant queries in $buildPlenoGroup closure

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/AboutController.php` |
| **Method** | `council()` |
| **Line** | ~31-43 |
| **Issue** | `$buildPlenoGroup` closure called 4 times (for org types [1,2], [4,5,8], [6,7], [10]), each making separate DB queries |
| **Root Cause** | Same query builder pattern repeated with different type IDs instead of fetching once and filtering in memory |
| **Solution** | Fetch all pleno orgs in one query, then partition by type ID using `whereIn` on the collection |
| **Files To Change** | `app/Http/Controllers/AboutController.php` |
| **What To Change** | Replace 4x `Organization::query()->whereIn('organization_type_id', $typeIds)->with(...)->get()` with a single `Organization::query()->whereIn('organization_type_id', [1,2,4,5,6,7,8,10])->with(...)->get()` then `->whereIn('organization_type_id', $typeIds)` on the collection |
| **Is Done** | Yes |

### B-004 [BUG] HomeController - Unterminated query

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/HomeController.php` |
| **Method** | `__invoke()` |
| **Line** | ~42-44 |
| **Issue** | `$announcements = Article::where(...)->with(...);` never has `->get()` or `->paginate()` called - query builder is returned but not executed |
| **Root Cause** | Missing terminal call on query builder |
| **Solution** | Add `->get()` at the end of the announcement query |
| **Files To Change** | `app/Http/Controllers/HomeController.php` |
| **What To Change** | Add `->get()` to the `$announcements` query chain |
| **Is Done** | Yes |

### B-005 [LOW] ArticleController - Missing eager load on $user->organizations

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/ArticleController.php` |
| **Method** | `create()`, `edit()` |
| **Line** | ~47, ~136 |
| **Issue** | `$user->organizations` accessed without eager loading - causes additional query if called repeatedly |
| **Root Cause** | `organizations` relationship on User not preloaded |
| **Solution** | Use `$user = Auth::user()->load('organizations');` before accessing the relationship |
| **Files To Change** | `app/Http/Controllers/ArticleController.php` |
| **What To Change** | In `create()` and `edit()`, load organizations before accessing: `$user = Auth::user()->load('organizations');` |
| **Is Done** | Yes |

---

## BACKEND - SECURITY ISSUES

### S-001 [HIGH] Missing ownership check in approve() / revert() methods

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/NewsController.php`, `app/Http/Controllers/BidangController.php`, `app/Http/Controllers/TerritorialController.php` |
| **Method** | `approve()`, `revert()` |
| **Line** | ~16-22 (News), ~same (Bidang, Territorial) |
| **Issue** | These methods modify resource status without verifying user owns or has permission over the specific resource - relies solely on route middleware |
| **Root Cause** | No authorization check inside controller method |
| **Solution** | Add ownership/permission check before modifying: `if ($resource->user_id !== auth()->id() && !auth()->user()->can('publish')) abort(403);` |
| **Files To Change** | `app/Http/Controllers/NewsController.php`, `app/Http/Controllers/BidangController.php`, `app/Http/Controllers/TerritorialController.php` |
| **What To Change** | In each `approve()` and `revert()` method, add authorization check before `findOrFail` or before save |
| **Is Done** | Yes |

### S-002 [HIGH] No Model Policies defined

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Providers/AuthServiceProvider.php` |
| **Method** | N/A |
| **Line** | N/A |
| **Issue** | No Laravel Model Policies exist for any models - authorization is scattered across middleware and manual checks, making it easy to miss authorization in new code |
| **Root Cause** | Policies not created |
| **Solution** | Create policies for Article, News, Organization, User, Council models |
| **Files To Change** | `app/Policies/` (new directory), `app/Providers/AuthServiceProvider.php` |
| **What To Change** | Create policy classes, register them in AuthServiceProvider, use `$this->authorize('action', $model)` in controllers |
| **Is Done** | No |

### S-003 [MEDIUM] getUsers() returns full Eloquent models instead of API Resource

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/UserController.php` |
| **Method** | `getUsers()` |
| **Line** | ~30-34 |
| **Issue** | `return response()->json(['data' => $users]);` returns full Eloquent models - while `$hidden` hides password/remember_token, relationship data or future changes could expose sensitive fields |
| **Root Cause** | Direct model serialization instead of explicit API Resource |
| **Solution** | Create `UserResource` API Resource and use `UserResource::collection($users)` |
| **Files To Change** | `app/Http/Resources/UserResource.php` (new), `app/Http/Controllers/UserController.php` |
| **What To Change** | Replace `$users` direct return with `UserResource::collection($users)` |
| **Is Done** | Yes |

### S-004 [LOW] whereRaw search input lacks length validation

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/UserController.php` |
| **Method** | `getUsers()` |
| **Line** | ~24-27 |
| **Issue** | `whereRaw('MATCH(...) AGAINST(? IN BOOLEAN MODE)', [$search])` - search string not validated for length, could cause full-table scan on very long input |
| **Root Cause** | No input validation on search parameter |
| **Solution** | Add max length check: `if (strlen($search) > 100) return response()->json(['data' => []]);` |
| **Files To Change** | `app/Http/Controllers/UserController.php` |
| **What To Change** | Add length validation before the whereRaw call |
| **Is Done** | Yes |

---

## FRONTEND - PERFORMANCE ISSUES

### F-001 [HIGH] Articles/Index.jsx - columns array recreated every render

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Articles/Index.jsx` |
| **Line** | ~21-122 |
| **Issue** | `const columns = [...]` defined inline in component body - recreated on every render |
| **Root Cause** | Array defined inside component instead of outside or memoized |
| **Solution** | Wrap in `useMemo(() => [...], [auth])` or define outside component |
| **Files To Change** | `resources/js/Pages/Articles/Index.jsx` |
| **What To Change** | Wrap `columns` definition with `useMemo(() => [...], [auth])` |
| **Is Done** | Yes |

### F-002 [HIGH] Territorial/DetailSidebarInfo.jsx - findUpdatedTerritory() not memoized, O(n*m) complexity

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/DetailSidebarInfo.jsx` |
| **Method** | N/A (inline function) |
| **Line** | ~178-198 |
| **Issue** | `findUpdatedTerritory()` uses nested `.find()` loops over `props.territories` and `parent.children` on every render |
| **Root Cause** | Expensive computation not memoized |
| **Solution** | Wrap in `useMemo(() => findUpdatedTerritory(), [territory, props.territories])` or restructure to use a Map |
| **Files To Change** | `resources/js/Pages/Territorial/DetailSidebarInfo.jsx` |
| **What To Change** | Convert to `useMemo` or pre-build lookup Map keyed by ID |
| **Is Done** | Yes |

### F-003 [HIGH] About/Council.jsx - two .filter() passes on same data

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/About/Council.jsx` |
| **Method** | N/A (inline computation) |
| **Line** | ~132-142 |
| **Issue** | `allCouncils.filter(...)` called twice - once for `executiveCouncil`, once for `fieldCoordinators` |
| **Root Cause** | Redundant iteration over same dataset |
| **Solution** | Single `.reduce()` pass into two arrays, or `useMemo` with both filter conditions |
| **Files To Change** | `resources/js/Pages/About/Council.jsx` |
| **What To Change** | Replace two `.filter()` with single `.reduce()` or memoized computation |
| **Is Done** | Yes |

### F-004 [MEDIUM] Information/Formulir.jsx - filteredData not wrapped in useMemo

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Information/Formulir.jsx` |
| **Method** | N/A (inline computation) |
| **Line** | ~113-125 |
| **Issue** | `filteredData` computed on every render, should be memoized since it only depends on `searchQuery` |
| **Root Cause** | `map().filter()` chain not memoized |
| **Solution** | Wrap in `useMemo(() => ..., [searchQuery])` |
| **Files To Change** | `resources/js/Pages/Information/Formulir.jsx` |
| **What To Change** | Wrap `filteredData` computation with `useMemo` |
| **Is Done** | Yes |

### F-005 [MEDIUM] Territorial/Show.jsx - data.children mapped twice

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/Show.jsx` |
| **Line** | ~47, ~143 |
| **Issue** | `data.children` mapped at line 47 AND again at line 143 in separate sections of the same render |
| **Root Cause** | Same data transformed multiple times in one render cycle |
| **Solution** | Pre-compute children mappings with `useMemo` before the two sections |
| **Files To Change** | `resources/js/Pages/Territorial/Show.jsx` |
| **What To Change** | Extract children mapping to top-of-render `useMemo` |
| **Is Done** | Yes |

### F-006 [MEDIUM] Territorial/DetailSidebarInfo.jsx - children mapped twice

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/DetailSidebarInfo.jsx` |
| **Line** | ~149-165, ~399-412 |
| **Issue** | `currentTerritory.children` mapped twice in separate sections of same render |
| **Root Cause** | Same data transformed multiple times |
| **Solution** | Pre-compute with `useMemo` |
| **Files To Change** | `resources/js/Pages/Territorial/DetailSidebarInfo.jsx` |
| **What To Change** | Extract children mapping to `useMemo` |
| **Is Done** | Yes |

### F-007 [MEDIUM] User/Table.jsx - highlight() regex recreation every call

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/User/Table.jsx` |
| **Line** | ~6-21 |
| **Issue** | `highlight()` creates `new RegExp()` on every call - regex compiled repeatedly |
| **Root Cause** | Function not memoized |
| **Solution** | Wrap in `useMemo` inside component, or move regex creation outside and reuse |
| **Files To Change** | `resources/js/Pages/User/Table.jsx` |
| **What To Change** | Memoize the regex or extract outside component |
| **Is Done** | Yes |

### F-008 [MEDIUM] Territorial/Index.jsx - selectedPeriod not memoized

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/Index.jsx` |
| **Line** | ~21 |
| **Issue** | `selectedPeriod` computed with `.find()` on every render |
| **Root Cause** | Not memoized |
| **Solution** | Wrap in `useMemo(() => periods?.find(...), [periods, selectedPeriodId])` |
| **Files To Change** | `resources/js/Pages/Territorial/Index.jsx` |
| **What To Change** | Wrap `selectedPeriod` in `useMemo` |
| **Is Done** | Yes |

### F-009 [MEDIUM] Territorial/ParentTable.jsx - getMemberName/getMemberProfile recreated every render

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/ParentTable.jsx` |
| **Line** | ~79-89, ~191-192 |
| **Issue** | `getMemberName()` and `getMemberProfile()` defined inside component - recreated every render |
| **Root Cause** | Function definitions inside component body |
| **Solution** | Define outside component (if pure) or wrap in `useCallback` |
| **Files To Change** | `resources/js/Pages/Territorial/ParentTable.jsx` |
| **What To Change** | Move functions outside component or wrap in `useCallback` |
| **Is Done** | Yes |

### F-010 [MEDIUM] Information/ArticleIndex.jsx - slice/map inline in JSX

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Information/ArticleIndex.jsx` |
| **Line** | ~29-33 |
| **Issue** | `articles.data[0]` and `articles.data.slice(1).map()` done inline in JSX |
| **Root Cause** | Data transformation in JSX instead of at component top |
| **Solution** | Destructure at top: `const [featured, ...rest] = articles.data || []` |
| **Files To Change** | `resources/js/Pages/Information/ArticleIndex.jsx` |
| **What To Change** | Move slice to destructuring at component top |
| **Is Done** | Yes |

### F-011 [MEDIUM] Home/Index.jsx - SERVICE/news maps not memoized

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Home/Index.jsx` |
| **Line** | ~303-322, ~345-347 |
| **Issue** | `SERVICES.map()` and `news.map()` inline in JSX without memoization |
| **Root Cause** | Static-ish data mapped in render |
| **Solution** | Pre-compute with `useMemo` |
| **Files To Change** | `resources/js/Pages/Home/Index.jsx` |
| **What To Change** | Wrap mapped sections with `useMemo` |
| **Is Done** | Yes |

### F-012 [LOW] Territorial/SectorCard.jsx - members/children mapped without memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/SectorCard.jsx` |
| **Line** | ~5, ~20-22, ~27-31 |
| **Issue** | `members` and `item.children` accessed and mapped without memoization |
| **Root Cause** | Props accessed in render without memoization |
| **Solution** | Pre-compute with `useMemo` |
| **Files To Change** | `resources/js/Pages/Territorial/SectorCard.jsx` |
| **What To Change** | Wrap children/members access in `useMemo` |
| **Is Done** | Yes |

### F-013 [LOW] Territorial/ChildrenTable.jsx - children.map() inline in render

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/ChildrenTable.jsx` |
| **Line** | ~110 |
| **Issue** | `territory.children.map()` inline in render |
| **Root Cause** | Map in JSX |
| **Solution** | Pre-compute with `useMemo` |
| **Files To Change** | `resources/js/Pages/Territorial/ChildrenTable.jsx` |
| **What To Change** | Extract children mapping to `useMemo` |
| **Is Done** | Yes |

---

## DONE

### D-001 AboutController.php - DPH/Pleno restructure (manual)

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/AboutController.php`, `resources/js/Pages/About/Council.jsx` |
| **Issue** | Council page needed restructure into DPH and Pleno sections per business logic requirements |
| **Solution** | Restructured controller to return `dph` and `plenoGroups`, updated frontend to render two distinct sections |
| **Is Done** | Yes |

### D-002 AboutController.php - N+1 fix in council() method

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/AboutController.php` |
| **Issue** | N+1 in council query - `users` relationship fetched per council inside loop |
| **Solution** | Used `with(['users' => fn($q) => $q->wherePivot(...)])` to eager load |
| **Is Done** | Yes |

### D-003 Council.jsx - DPH member rendering fix

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/About/Council.jsx` |
| **Issue** | `CouncilSection` was using `council.users` instead of `council.members`, and `council.title` instead of `council.role` |
| **Solution** | Fixed `CouncilSection` to use `council.members` and pass `council.role` as role |
| **Is Done** | Yes |

### D-004 CouncilController.php - N+1 Query in index()

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/CouncilController.php` |
| **Issue** | N+1 query - users relationship fetched lazily per council in map() loop |
| **Solution** | Used `with(['users' => fn($q) => $q->wherePivot(...)])` to eager load |
| **Is Done** | Yes |

### D-005 OrganizationController.php - Missing eager load on auth()->user()->organizations

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/OrganizationController.php` |
| **Issue** | `auth()->user()->organizations` accessed without eager loading in edit() and update() |
| **Solution** | Added `$user->load('organizations')` before accessing the relationship |
| **Is Done** | Yes |

### D-006 AboutController.php - Redundant queries in $buildPlenoGroup closure

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/AboutController.php` |
| **Issue** | $buildPlenoGroup closure called 4 times with separate DB queries |
| **Solution** | Fetched all pleno orgs in one query, then partitioned by type ID in memory |
| **Is Done** | Yes |

### D-007 HomeController.php - Unterminated query

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/HomeController.php` |
| **Issue** | `$announcements` query builder never had `->get()` called |
| **Solution** | Added `->get()` at the end of the announcement query chain |
| **Is Done** | Yes |

### D-008 ArticleController.php - Missing eager load on $user->organizations

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/ArticleController.php` |
| **Issue** | `$user->organizations` accessed without eager loading in create() and edit() |
| **Solution** | Added `$user = Auth::user()->load('organizations')` before accessing |
| **Is Done** | Yes |

### D-009 NewsController.php, BidangController.php, TerritorialController.php - Missing ownership check

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/NewsController.php`, `app/Http/Controllers/BidangController.php`, `app/Http/Controllers/TerritorialController.php` |
| **Issue** | approve() and revert() methods modified resource status without verifying ownership |
| **Solution** | Added authorization check: `if ($resource->user_id !== auth()->id() && !auth()->user()->can('publish')) abort(403);` |
| **Is Done** | Yes |

### D-010 UserController.php - API Resource for getUsers()

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/UserController.php`, `app/Http/Resources/UserResource.php` (new) |
| **Issue** | getUsers() returned full Eloquent models instead of explicit API Resource |
| **Solution** | Created UserResource and used UserResource::collection($users) |
| **Is Done** | Yes |

### D-011 UserController.php - Search input length validation

| Attribute | Detail |
|-----------|--------|
| **File** | `app/Http/Controllers/UserController.php` |
| **Issue** | whereRaw search input lacked length validation, could cause full-table scan |
| **Solution** | Added `if (strlen($search) > 100) return response()->json(['data' => []]);` |
| **Is Done** | Yes |

### D-012 Articles/Index.jsx - columns array memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Articles/Index.jsx` |
| **Issue** | columns array recreated every render |
| **Solution** | Wrapped columns definition with `useMemo(() => [...], [auth])` |
| **Is Done** | Yes |

### D-013 Territorial/DetailSidebarInfo.jsx - findUpdatedTerritory() memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/DetailSidebarInfo.jsx` |
| **Issue** | findUpdatedTerritory() used nested .find() loops on every render |
| **Solution** | Converted to `useMemo` with territory and props.territories as dependencies |
| **Is Done** | Yes |

### D-014 About/Council.jsx - Single reduce pass for filtering

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/About/Council.jsx` |
| **Issue** | allCouncils.filter() called twice for executiveCouncil and fieldCoordinators |
| **Solution** | Replaced with single `.reduce()` pass into two arrays wrapped in useMemo |
| **Is Done** | Yes |

### D-015 Information/Formulir.jsx - filteredData memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Information/Formulir.jsx` |
| **Issue** | filteredData computed on every render |
| **Solution** | Wrapped computation with `useMemo` (already present) |
| **Is Done** | Yes |

### D-016 Territorial/Show.jsx - children mapping memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/Show.jsx` |
| **Issue** | data.children mapped twice in separate sections |
| **Solution** | Pre-computed children with `useMemo` before the two sections |
| **Is Done** | Yes |

### D-017 Territorial/DetailSidebarInfo.jsx - children memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/DetailSidebarInfo.jsx` |
| **Issue** | currentTerritory.children mapped twice |
| **Solution** | Pre-computed with `useMemo` |
| **Is Done** | Yes |

### D-018 User/Table.jsx - highlight() regex caching

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/User/Table.jsx` |
| **Issue** | highlight() created new RegExp on every call |
| **Solution** | Added regex cache using Map to reuse compiled regex |
| **Is Done** | Yes |

### D-019 Territorial/Index.jsx - selectedPeriod memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/Index.jsx` |
| **Issue** | selectedPeriod computed with .find() on every render |
| **Solution** | Wrapped with `useMemo(() => periods?.find(...), [periods, selectedPeriodId])` |
| **Is Done** | Yes |

### D-020 Territorial/ParentTable.jsx - useCallback for getMemberName/getMemberProfile

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/ParentTable.jsx` |
| **Issue** | getMemberName() and getMemberProfile() recreated every render |
| **Solution** | Wrapped in `useCallback` |
| **Is Done** | Yes |

### D-021 Information/ArticleIndex.jsx - Destructure at top

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Information/ArticleIndex.jsx` |
| **Issue** | articles.data[0] and articles.data.slice(1).map() inline in JSX |
| **Solution** | Destructured at top: `const [featured, ...rest] = articles.data || []` |
| **Is Done** | Yes |

### D-022 Home/Index.jsx - news mapping memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Home/Index.jsx` |
| **Issue** | news.map() inline in JSX without memoization |
| **Solution** | Wrapped mapped section with `useMemo` |
| **Is Done** | Yes |

### D-023 Territorial/SectorCard.jsx - members/children memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/SectorCard.jsx` |
| **Issue** | members and item.children accessed without memoization |
| **Solution** | Wrapped with `useMemo` |
| **Is Done** | Yes |

### D-024 Territorial/ChildrenTable.jsx - children mapping memoization

| Attribute | Detail |
|-----------|--------|
| **File** | `resources/js/Pages/Territorial/ChildrenTable.jsx` |
| **Issue** | territory.children.map() inline in render |
| **Solution** | Pre-computed with `useMemo` |
| **Is Done** | Yes |

---

## TOTALS

| Category | Count | Done | Remaining |
|----------|-------|------|-----------|
| Backend N+1/Query | 5 | 5 | 0 |
| Backend Security | 4 | 3 | 1 |
| Frontend Performance | 13 | 13 | 0 |
| Done | 24 | 24 | 0 |
| **Total** | **46** | **45** | **1** |

---

## IMPLEMENTATION NOTES

- All changes must preserve existing functionality - only performance/security improvements
- Backend changes should not alter response structure or data returned to frontend
- Frontend changes should not alter component behavior or visual output
- Test each change individually before moving to next
- No new dependencies or files should be added unless explicitly required (e.g., API Resources)
