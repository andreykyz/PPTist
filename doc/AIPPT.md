## The Basic Principles of Template-Based AIPPT
1. Define the PPT structure (what types of pages a set of PPTs contains, and what content each type of page has);
2. Based on the above structure, define the data format. This data will be used by AI to generate structured PPT data. See:
    - Example data: `public/mocks/AIPPT.json`
    - Structure definition: `src/types/AIPPT.ts`
3. Create templates, and mark the structure types in the templates;
4. AI generates data that matches the PPT structure defined in step 1;
5. Use AI or other solutions to generate related images (common approaches include: AI text-to-image generation, stock image library search matching);
6. Match and combine the AI-generated data and images with the templates to generate the final PPT.

> Note 1: Although the current online version does not provide the image generation demonstration effect, the AIPPT method does support this functionality. You only need to provide your own image source and pass the set of candidate images into the AIPPT method in the required format.

> Note 2: The above applies only to template-based AIPPT. Non-template-based AIPPT can directly generate the final target format; refer to: `AI_PPT_SCHEMA.md`

## AIPPT Template Creation Workflow
1. Open PPTist;
2. Create the template pages;
3. Open the [Slide Type Annotation] feature in the top-left menu;
4. Annotate the page type and node type for the created pages;
5. Use the export feature to export as a JSON file.

> Note: There is actually no template specially dedicated to AIPPT. The so-called AIPPT templates are simply ordinary pages created in PPTist with type annotations added. This data is not only used for AI-generated PPTs, but can also be used as ordinary page templates.

## Template Annotation Types: Page Annotations and Node Annotations
#### Cover Page
* Title
* Body text
* Image (background image, page illustration)
#### Table of Contents Page
* Table of contents title (annotated type: list item)
* Image (background image, page illustration)
#### Transition Page (section transition)
* Title
* Body text
* Section number
* Image (background image, page illustration)
#### Content Page
* Title
* 2–4 content items, including:
  * Content item title (annotated type: list item title)
  * Content item body (annotated type: list item)
  * Content item number (annotated type: item number)
* Image (background image, page illustration, item illustration)
#### Closing Page (acknowledgment page)
* Image (background image, page illustration)

> Node annotations are divided into two types - text annotations and image annotations:
> - Text annotations can apply to text nodes and shape nodes that contain text;
> - Image annotations only apply to image nodes;
> - You can add more annotation types yourself (such as charts).

## AIPPT Template Creation Principles
A template used for AIPPT should include at least the following pages (at least 13 pages, but 30+ pages is recommended):
* 1 cover page (2 or more recommended)
* 6 table of contents pages: one for each of 2–6 items, and one for 10 items (2 of each recommended)
* 1 transition page (3 or more recommended)
* 4 content pages: one for each of 2–4 items, and one for 1 item (2 of each recommended)
* 1 closing page (2 or more recommended)

> Note:
> 1. The page counts above only satisfy the most basic requirements of the current replacement logic. If you want the AI-generated PPT to have some randomness, you need to appropriately increase the number of each page type (for example, if there are 3 cover pages in the template, one will be randomly selected from the 3 during generation);
> 2. Under the current replacement logic, the table of contents page supports 1–20 items, and the content page supports 1–12 items. However, you do not need to create templates for every possible count, because the program automatically handles special item counts by splicing/clipping templates;
> 3. You can adjust the replacement logic yourself to support more cases.