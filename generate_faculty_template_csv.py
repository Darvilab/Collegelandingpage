#!/usr/bin/env python3
"""
Script to generate CSV template for faculty and staff data collection.
This creates a CSV file that can be opened in Excel with all necessary fields.
"""

import csv
from datetime import datetime

def create_faculty_template_csv():
    """Create CSV template for faculty and staff data collection."""
    
    # Define all column headers with descriptions
    headers = [
        "ID*",
        "Slug*",
        "First Name*",
        "Middle Name",
        "Last Name*",
        "Title",
        "Designation*",
        "Department",
        "Faculty Type*",
        "Category*",
        "Image Path",
        "Bio",
        "Specialization",
        "Courses - Names",
        "Courses - Codes",
        "Courses - Programs",
        "Courses - Semesters",
        "Education - Degrees",
        "Education - Fields",
        "Education - Institutions",
        "Education - Years",
        "Education - Countries",
        "Experience - Positions",
        "Experience - Organizations",
        "Experience - Durations",
        "Experience - Descriptions",
        "Publications - Titles",
        "Publications - Types",
        "Publications - Venues",
        "Publications - Years",
        "Publications - Authors",
        "Publications - Links",
        "Research Interests - Areas",
        "Research Interests - Descriptions",
        "Awards - Titles",
        "Awards - Organizations",
        "Awards - Years",
        "Awards - Descriptions",
        "Contact - Email",
        "Contact - Phone",
        "Contact - Office",
        "Contact - Website",
        "Contact - LinkedIn",
        "Contact - Google Scholar",
        "Contact - ORCID",
        "Joining Date",
        "Reports To",
        "Manages",
        "Board Position",
        "Leadership Role",
        "Is Active*",
        "Order"
    ]
    
    # Example data row
    example_row = [
        "faculty-001",
        "dr-rajesh-sharma",
        "Rajesh",
        "",
        "Sharma",
        "Dr.",
        "Professor",
        "Computer Engineering",
        "full-time",
        "board-member",
        "/pp/1.png",
        "Dr. Rajesh Sharma is a distinguished professor with over 20 years of experience in computer engineering and artificial intelligence.",
        "Artificial Intelligence, Machine Learning, Computer Vision",
        "Machine Learning; Neural Networks and Deep Learning; Computer Vision",
        "CS501; CS502; CS601",
        "B. Tech in AI; B. Tech in AI; B. Tech in AI",
        "Semester V; Semester V; Semester VI",
        "Ph.D.; M.S.; B.E.",
        "Computer Science; Computer Science; Computer Engineering",
        "Stanford University; MIT; Tribhuvan University",
        "2005; 2001; 1999",
        "USA; USA; Nepal",
        "Professor; Associate Professor; Research Scientist",
        "NIET; Kathmandu University; Google Research",
        "2015 - Present; 2010 - 2015; 2005 - 2010",
        "Leading research in AI and teaching graduate courses; ; ",
        "Deep Learning for Medical Image Analysis; Neural Architecture Search for Edge Devices",
        "journal; conference",
        "Nature Machine Intelligence; ICML 2022",
        "2023; 2022",
        "R. Sharma, A. Kumar; ",
        "https://example.com/pub1; https://example.com/pub2",
        "Deep Learning; Computer Vision; Medical AI",
        "Neural network architectures and optimization; Image recognition and video analysis; AI applications in healthcare",
        "Best Paper Award; Outstanding Researcher",
        "ICML; Nepal Academy of Science",
        "2022; 2021",
        "; ",
        "rajesh.sharma@niet.edu.np",
        "+977-1-XXXXXXX",
        "Block A, Room 301",
        "",
        "linkedin.com/in/rajeshsharma",
        "scholar.google.com/citations?user=rajeshsharma",
        "",
        "2015-01-15",
        "",
        "",
        "Chairman",
        "Head of Department - Computer Engineering",
        "true",
        "1"
    ]
    
    filename = f"Faculty_Staff_Data_Template_{datetime.now().strftime('%Y%m%d')}.csv"
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write instruction row (as comment in first cell)
        writer.writerow([f"INSTRUCTIONS: Fill in data for each faculty/staff member. Required fields marked with *. For multiple entries, separate with semicolons (;). See example row below."] + [""] * (len(headers) - 1))
        
        # Write headers
        writer.writerow(headers)
        
        # Write example row
        writer.writerow(example_row)
        
        # Write empty rows for data entry
        for _ in range(10):
            writer.writerow([""] * len(headers))
    
    print(f"✓ CSV template created: {filename}")
    print(f"\nINSTRUCTIONS:")
    print(f"1. Open this CSV file in Excel or Google Sheets")
    print(f"2. Review the example row to understand the format")
    print(f"3. Fill in data for each faculty/staff member")
    print(f"4. Required fields are marked with *")
    print(f"5. For multiple values (courses, education, etc.), separate with semicolons (;)")
    print(f"6. Keep related fields in the same order (e.g., course names and codes)")
    print(f"\nFIELD GUIDELINES:")
    print(f"- ID: Unique identifier (e.g., faculty-001, staff-001)")
    print(f"- Slug: URL-friendly name (lowercase, hyphens: dr-rajesh-sharma)")
    print(f"- Faculty Type: full-time, part-time, or visiting")
    print(f"- Category: teaching, board-member, administrative, support, or non-teaching")
    print(f"- Is Active: true or false")
    print(f"- Joining Date: YYYY-MM-DD format")
    print(f"\nThe template is ready for data collection!")
    
    return filename

if __name__ == "__main__":
    create_faculty_template_csv()


