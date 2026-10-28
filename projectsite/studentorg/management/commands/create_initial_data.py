from django.core.management.base import BaseCommand
from faker import Faker
from studentorg.models import College, Program, Organization, Student, OrgMember

COLLEGES = {
    "College of Sciences": ["BS Computer Science", "BS Biology", "BS Mathematics", "BS Environmental Science"],
    "College of Engineering": ["BS Civil Engineering", "BS Electrical Engineering", "BS Mechanical Engineering"],
    "College of Education": ["BEEd Elementary Education", "BSEd English", "BSEd Mathematics"],
    "College of Business": ["BS Accountancy", "BS Business Administration", "BS Entrepreneurship"],
    "College of Arts and Humanities": ["AB Filipino", "AB Communication", "AB Political Science"],
}


class Command(BaseCommand):
    help = 'Create initial data for the application'

    def handle(self, *args, **kwargs):
        self.create_colleges_and_programs()
        self.create_organization(10)
        self.create_students(50)
        self.create_membership(30)

    def create_colleges_and_programs(self):
        for college_name, programs in COLLEGES.items():
            college, _ = College.objects.get_or_create(college_name=college_name)
            for prog in programs:
                Program.objects.get_or_create(prog_name=prog, college=college)
        self.stdout.write(self.style.SUCCESS(
            'Colleges and programs created successfully.'))

    def create_organization(self, count):
        fake = Faker()
        for _ in range(count):
            Organization.objects.create(
                name=' '.join(fake.word() for _ in range(2)).title(),
                college=College.objects.order_by('?').first(),
                description=fake.sentence()
            )
        self.stdout.write(self.style.SUCCESS(
            'Organizations created successfully.'))

    def create_students(self, count):
        fake = Faker('en_PH')
        for _ in range(count):
            Student.objects.create(
                student_id=f"{fake.random_int(2020, 2025)}-{fake.random_int(1, 8)}-{fake.random_number(digits=4, fix_len=True)}",
                lastname=fake.last_name(),
                firstname=fake.first_name(),
                middlename=fake.last_name(),
                program=Program.objects.order_by('?').first()
            )
        self.stdout.write(self.style.SUCCESS(
            'Students created successfully.'))

    def create_membership(self, count):
        fake = Faker()
        for _ in range(count):
            OrgMember.objects.create(
                student=Student.objects.order_by('?').first(),
                organization=Organization.objects.order_by('?').first(),
                date_joined=fake.date_between(start_date="-2y", end_date="today")
            )
        self.stdout.write(self.style.SUCCESS(
            'Memberships created successfully.'))