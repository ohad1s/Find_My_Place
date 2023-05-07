from db_functions import generic_query


def validate_student_registry(student_id):
    query = f"""
    SELECT ID
    FROM Library.Students
    WHERE ID = {student_id}
    """
    res = generic_query(query)
    