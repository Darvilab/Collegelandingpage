# Faculty & Staff Data Collection Guide

This guide will help you collect and organize faculty and staff data using the provided Excel/CSV template.

## Quick Start

1. Open `Faculty_Staff_Data_Template_YYYYMMDD.csv` in Excel or Google Sheets
2. Review the example row (row 3) to understand the format
3. Fill in data for each faculty/staff member starting from row 4
4. Save the file when complete

## Understanding the Template

### Required Fields (marked with *)

- **ID***: Unique identifier for each person (e.g., `faculty-001`, `staff-001`)
- **Slug***: URL-friendly version of the name (e.g., `dr-rajesh-sharma`)
  - Use lowercase letters
  - Replace spaces with hyphens
  - Remove special characters
- **First Name***: Person's first name
- **Last Name***: Person's last name
- **Designation***: Job title (e.g., Professor, Associate Professor, Assistant Professor, Lecturer, Registrar, Lab Technician)
- **Faculty Type***: Must be one of:
  - `full-time`
  - `part-time`
  - `visiting`
- **Category***: Must be one of:
  - `teaching` - Teaching faculty
  - `board-member` - Board members
  - `administrative` - Administrative staff
  - `support` - Support staff
  - `non-teaching` - Non-teaching staff
- **Is Active***: `true` or `false`

### Optional Fields

All other fields are optional but should be filled when available.

## Field-Specific Instructions

### Basic Information

- **Title**: Dr., Prof., Mr., Ms., etc.
- **Middle Name**: Middle name (if applicable)
- **Department**: Computer Engineering, Biomedical Engineering, Administration, etc.
- **Image Path**: Path to photo file (e.g., `/pp/1.png` or `/Faculty-Staff/john-doe.jpg`)
- **Bio**: Brief biography or description (2-3 sentences recommended)
- **Specialization**: Areas of expertise (comma-separated, e.g., "AI, Machine Learning, Computer Vision")

### Courses (Multiple entries allowed)

For faculty who teach multiple courses, use semicolons (;) to separate entries. **Keep the order consistent** across all course-related columns.

**Example:**
- Courses - Names: `Machine Learning; Neural Networks; Computer Vision`
- Courses - Codes: `CS501; CS502; CS601`
- Courses - Programs: `B. Tech in AI; B. Tech in AI; B. Tech in AI`
- Courses - Semesters: `Semester V; Semester V; Semester VI`

**Important:** All course columns must have the same number of entries in the same order.

### Education (Multiple entries allowed)

List all degrees, starting with the highest. Use semicolons to separate multiple entries.

**Example:**
- Education - Degrees: `Ph.D.; M.S.; B.E.`
- Education - Fields: `Computer Science; Computer Science; Computer Engineering`
- Education - Institutions: `Stanford University; MIT; Tribhuvan University`
- Education - Years: `2005; 2001; 1999`
- Education - Countries: `USA; USA; Nepal`

**Important:** All education columns must have the same number of entries in the same order.

### Experience (Multiple entries allowed)

List work experience, typically starting with current position. Use semicolons to separate entries.

**Example:**
- Experience - Positions: `Professor; Associate Professor; Research Scientist`
- Experience - Organizations: `NIET; Kathmandu University; Google Research`
- Experience - Durations: `2015 - Present; 2010 - 2015; 2005 - 2010`
- Experience - Descriptions: `Leading research in AI; ; ` (optional, can be left empty)

### Publications (Multiple entries allowed)

List research publications. Use semicolons to separate entries.

**Example:**
- Publications - Titles: `Deep Learning for Medical Image Analysis; Neural Architecture Search`
- Publications - Types: `journal; conference` (options: journal, conference, book, patent, other)
- Publications - Venues: `Nature Machine Intelligence; ICML 2022`
- Publications - Years: `2023; 2022`
- Publications - Authors: `R. Sharma, A. Kumar; ` (comma-separated within each publication)
- Publications - Links: `https://example.com/pub1; https://example.com/pub2` (optional)

### Research Interests (Multiple entries allowed)

List research areas. Use semicolons to separate entries.

**Example:**
- Research Interests - Areas: `Deep Learning; Computer Vision; Medical AI`
- Research Interests - Descriptions: `Neural network architectures; Image recognition; AI in healthcare` (optional)

### Awards (Multiple entries allowed)

List awards and recognitions. Use semicolons to separate entries.

**Example:**
- Awards - Titles: `Best Paper Award; Outstanding Researcher`
- Awards - Organizations: `ICML; Nepal Academy of Science`
- Awards - Years: `2022; 2021`
- Awards - Descriptions: `; ` (optional, can be left empty)

### Contact Information

Single values only (one entry per field):

- **Contact - Email**: Email address (e.g., `rajesh.sharma@niet.edu.np`)
- **Contact - Phone**: Phone number (e.g., `+977-1-XXXXXXX`)
- **Contact - Office**: Office location (e.g., `Block A, Room 301`)
- **Contact - Website**: Personal/professional website URL
- **Contact - LinkedIn**: LinkedIn profile URL (full URL or just the path)
- **Contact - Google Scholar**: Google Scholar profile URL
- **Contact - ORCID**: ORCID ID

### Additional Information

- **Joining Date**: Date in YYYY-MM-DD format (e.g., `2015-01-15`)
- **Reports To**: ID of supervisor/manager (if applicable, e.g., `faculty-001`)
- **Manages**: IDs of people they manage, separated by semicolons (e.g., `faculty-002; faculty-003`)
- **Board Position**: For board members (e.g., `Chairman`, `Member`, `Secretary`)
- **Leadership Role**: For leadership positions (e.g., `Dean`, `Head of Department`, `Director`)
- **Order**: Display order number (lower numbers appear first, optional)

## Data Entry Tips

1. **Start Small**: Fill in data for 2-3 people first to test the format
2. **Be Consistent**: Use the same format for similar entries (e.g., always use "Dr." or always use "Dr")
3. **Check Order**: When entering multiple related items (courses, education), ensure they're in the same order across columns
4. **Use Semicolons**: Always use semicolons (;) to separate multiple entries, not commas
5. **Keep Backups**: Save your work frequently and keep backup copies
6. **Review Examples**: Refer to the example row for formatting guidance

## Common Mistakes to Avoid

❌ **Don't use commas** to separate multiple entries (use semicolons)
❌ **Don't mix up the order** of related entries (e.g., course names and codes)
❌ **Don't leave required fields empty** (marked with *)
❌ **Don't use inconsistent formats** (e.g., mixing "Dr." and "Dr" for titles)
❌ **Don't forget to save** your work regularly

## Example Entry

Here's a complete example of how to fill in one row:

| Field | Value |
|-------|-------|
| ID* | `faculty-001` |
| Slug* | `dr-rajesh-sharma` |
| First Name* | `Rajesh` |
| Middle Name | (leave empty) |
| Last Name* | `Sharma` |
| Title | `Dr.` |
| Designation* | `Professor` |
| Department | `Computer Engineering` |
| Faculty Type* | `full-time` |
| Category* | `board-member` |
| Image Path | `/pp/1.png` |
| Bio | `Dr. Rajesh Sharma is a distinguished professor...` |
| Specialization | `Artificial Intelligence, Machine Learning, Computer Vision` |
| Courses - Names | `Machine Learning; Neural Networks; Computer Vision` |
| Courses - Codes | `CS501; CS502; CS601` |
| Courses - Programs | `B. Tech in AI; B. Tech in AI; B. Tech in AI` |
| Courses - Semesters | `Semester V; Semester V; Semester VI` |
| Education - Degrees | `Ph.D.; M.S.; B.E.` |
| Education - Fields | `Computer Science; Computer Science; Computer Engineering` |
| Education - Institutions | `Stanford University; MIT; Tribhuvan University` |
| Education - Years | `2005; 2001; 1999` |
| Education - Countries | `USA; USA; Nepal` |
| Experience - Positions | `Professor; Associate Professor; Research Scientist` |
| Experience - Organizations | `NIET; Kathmandu University; Google Research` |
| Experience - Durations | `2015 - Present; 2010 - 2015; 2005 - 2010` |
| Contact - Email | `rajesh.sharma@niet.edu.np` |
| Contact - Phone | `+977-1-XXXXXXX` |
| Contact - Office | `Block A, Room 301` |
| Joining Date | `2015-01-15` |
| Board Position | `Chairman` |
| Leadership Role | `Head of Department - Computer Engineering` |
| Is Active* | `true` |
| Order | `1` |

## Questions?

If you have questions or need help with data entry, please contact the IT department or the person who provided this template.

## After Data Collection

Once you've completed filling in the data:

1. Review all entries for completeness and accuracy
2. Check that all required fields are filled
3. Verify that multiple entries are properly separated with semicolons
4. Ensure consistent formatting throughout
5. Save the final file
6. Submit the completed file to the designated person/department

---

**Template Version**: 1.0  
**Last Updated**: November 2024


