from fastapi import Security, HTTPException, status, Request
from fastapi.security.api_key import APIKeyHeader, APIKeyQuery
from src import config

api_key        = config.get_settings().API_KEY
api_key_header = APIKeyHeader(name="access_token", auto_error=False)
api_key_query  = APIKeyQuery( name="api_key",     auto_error=False)

async def get_api_key(
    request: Request,
    header: str = Security(api_key_header),
    query:  str = Security(api_key_query),
):
    # pick whichever one was provided
    key = header or query
    print(f"header: {header!r}, query: {query!r}, configured: {api_key!r}")
    if key == api_key:
        return key

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key"
    )
