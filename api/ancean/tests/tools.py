from itertools import product


class ModelTestTools:
  state_fields = []

  @classmethod
  def all_state_field_cases(cls):
    """
    Generates all combinations of Boolean fields.
    Returns the dictionaries in which the field and value are matched.
    """
    state_field_cases = product([True, False], repeat=len(cls.state_fields))
    cases_to_dicts = [dict(zip(cls.state_fields, values)) for values in state_field_cases]
    return cases_to_dicts
